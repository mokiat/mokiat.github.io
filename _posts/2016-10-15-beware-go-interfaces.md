---
layout: post
title: Beware of Go's Interfaces
category: Go
snippet: Something very important to have in mind when working with Go's interfaces.
---

When thinking about Go, the first thing that comes to your mind is probably channels, or concurrency, or maybe cross-compilation. And all of those are indeed at the heart of Go.

There is one other aspect of Go that was kind of new to me when I started learning it. That was Go's interface concept - the fact that you don't have to explicitly declare that a "class" (note the quotes) implements a given interface; rather the compiler just checks whether it has the required methods.

I have to admit, I was sceptical at first but I quickly grew to like it. It allowed for good testing and lean code design. In fact, I switched back to Java recently and that was one of the first things that I noticed that I miss. It prevented me from achieving a nice design pattern when the native Java classes were involved.

That said, Go's interfaces do have a dark side to them, something that can catch newcomers by surprise and throw them off balance.

Let me demonstrate this with an example.

Let's say that we have an interface called `StringProvider`. This could look like the following.

```go
type StringProvider interface {
	Provide() string
}
```

And we also have a very simple structure that implements that interface.

```go
type hardcodedStringProvider struct {
	Value string
}

func (p *hardcodedStringProvider) Provide() string {
	return p.Value
}
```

All trivial stuff so far. Let's create a constructor function for the structure above.

```go
func NewStringProvider(content string) StringProvider {
	var provider *hardcodedStringProvider = nil
	if content != "" {
		provider = &hardcodedStringProvider{
			Value: content,
		}
	}
	return provider
}
```

If a non-empty string argument is provided, we return an instance of `StringProvider`, implemented through `hardcodedStringProvider`, otherwise we return `nil`. At least that is the idea.

And before you start to dwell on why anyone would need such a constructor, it is all for the sake of the example.

Finally, we have a section of code that makes use of our constructor function.

```go
func main() {
	provider := NewStringProvider(os.Args[1])
	if provider != nil {
		fmt.Printf("Content: %s\n", provider.Provide())
	} else {
		fmt.Println("No string provider!")
	}
}
```

Now, if we pass `Hello` as a first argument to the program, you would expect this to print `Content: Hello` and you would be correct.
Similarly, we expect that if we pass an empty first argument (note: you would do that with `go run main.go ""`), it should print `No string provider!` and unfortunately you would be wrong.

You would actually get a `nil pointer dereference`.

And the reason for this is because `NewStringProvider` does not actually return `nil`.

If you are new to Go, you might be banging your head against the wall right now, looking at the code and clearly seeing that we defined the `provider` variable to be `nil` by default.

And you are right, it is actually nil by default. The problem arises when you return the variable from the function. Since we actually return a value of type `StringProvider`, the `provider` variable is "cast"/"converted" to such an interface.

Unlike other programming languages out there, where the interface is a kind of reference or pointer, in Go it is actually a value - a structure.

Here is a very simplistic representation of what an interface actually looks like.

```go
type interface struct {
	type *Type
	value *Value
}
```

It has two fields. One points to the type of the thing that is passed as the interface, and the other points to the instance of that type.

An interface is `nil` only when both pointers are `nil`. If you have either a type or a value, then it is no longer `nil`. And this is the case with the code sample above. When we return `provider` and convert it to an interface, it has `nil` value, but the type is `*hardcodedStringProvider`, hence the returned interface is not `nil` and the condition in the `main` function passes.

There are two ways to fix the code above.

The first way is specify the type of the `provider` variable as an interface all along, so that by setting it's default value to `nil` it will indeed be `nil`, as there is no type at that time.

```go
func NewStringProvider(content string) StringProvider {
	var provider StringProvider = nil
	if content != "" {
		provider = &hardcodedStringProvider{
			Value: content,
		}
	}
	return provider
}
```

The second way, and the one I prefer most, is to return the keyword `nil` whenever you want to return `nil`. It is most failsafe and most explicit.

```go
func NewStringProvider(content string) StringProvider {
	if content == "" {
		return nil
	}
	return &hardcodedStringProvider{
		Value: content,
	}
}
```

I know that most of you would have written the code as in the last example from the beginning, as it is most simple to read and comprehend, but I have seen sections of code where this problem is likely to occur and is not so trivial to spot.

**Note:** This is especially true when dealing with errors, since the `error` type in Go is actually an interface and a common practice is to return such values for error checking.

I hope all of this was useful and helps avoid any bugs or long troubleshooting sessions in the evening.

You can play around with the code here:
[https://play.golang.org/p/fMjynQRXkl](https://play.golang.org/p/fMjynQRXkl)

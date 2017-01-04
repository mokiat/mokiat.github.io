---
layout: post
title: Go's true can be false
category: Go
snippet: It turns out that you can override Go's true constant as well as others.
---

I was initially sceptical of the Go programming language and the decisions that were taken designing it. The `GOPATH` dependency management tree, the reverse syntax, and the lack of inheritance all struck me as strange.

As time passed, I quickly grew to like the language, however. And for what I initially thought as shortcomings, I gradually found solid logic and reasoning. In fact, I now like almost all of the design decisions that were made, and languages that I had previously admired have partially lost their glare.

Contrary to what most of you probably think, I wasn't going for a catchy title. The title is quite literal and is one of those things in which it's hard for me to find any solid reasoning.

Let's have a look at a very simple example.

```go
package main

import "fmt"

func main() {
	var status bool = true
	if status {
		fmt.Println("True")
	} else {
		fmt.Println("False")
	}
}
```

Looking at the code, one would expect that the output would be `True`. One would be correct.

```bash
$ go run main.go
True
```

The strange thing happens when we add the following line.

```go
var true = false
```

That results in the following code snippet.

```go
package main

import "fmt"

var true = false

func main() {
	var status bool = true
	if status {
		fmt.Println("True")
	} else {
		fmt.Println("False")
	}
}
```

Surprisingly, that does not result in a compiler, nor a runtime error. It runs perfectly fine and the result one gets is as follows.

```bash
go run main.go
False
```

Well, that's a bummer. It seems that you can override a `true` constant. Furthermore, you can even override some built-in types. Take a look at the following snippet.

```go
package main

import "fmt"

var int = false

func main() {
	var status bool = int
	if status {
		fmt.Println("True")
	} else {
		fmt.Println("False")
	}
}
```

That also returns `False`. We have overriden the `int` type to represent a constant.

I did report an [issue](https://github.com/golang/go/issues/12535) to the `golang` project on `GitHub` but failed to get a detailed explanation.

I am still not sure whether there is any logical purpose behind that. To me, it seems as though someone just forgot to include some tokens in the set of reserved keywords. Since `Go` promises a certain amount of backward compatibility, we should not expect that to be fixed in any of the `1.X.X` versions.

Still, all is not lost. If you fear that an imported package might mess your program and send you into a long and painful troubleshooting session, fear not. Since Go`s keywords are all lowercased, even if a package overrides those, that nasty piece coding would be restricted to the package alone, due to Go's lowercase private visibility concept.

Long story short, we can all live in peace, knowing that our code is safe. But it's always good to be aware of that peculiarity.

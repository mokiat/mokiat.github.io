---
layout: post
title: Brick Destroyer
category: project
snippet: An old game of mine that makes use of the ECS design.
---

Brick Destroyer is a game where you have to bounce a ball to hit and destroy bricks.

[![Thumbnail]({{ site.baseurl }}/assets/images/brickdestroyer.png)](http://mokiat.com/brick-destroyer/)

What differentiates this game from all the rest is the more realistic motion of the ball, where physics formula are emplyed.

You can see the end result here:
[http://mokiat.com/brick-destroyer/](http://mokiat.com/brick-destroyer/)

The source code is available here:
[https://github.com/mokiat/brick-destroyer](https://github.com/mokiat/brick-destroyer)


## History

To be honest, this is such an old project, that I can't trace its roots.

I believe it started as a Java university project. It was developed in Java and was meant to demonstrate the usage of OOP.
Back then it served it's project as I managed to demonstrate concepts like inheritance with classes like `Shape` and it's derivatives `Rectangle` and `Circle`. I employed encapsulation and polymorphism all around. And though that got me the grade, while also making it a fun project for me to do, little did I know back then that OOP was actually a poor choice of design and that there was a much better option for this specific software. But we will get to that in a while.

At one point I remember that I rewrote the whole project for mobile devices. And I am not talking about Android or iOS. Those were practically unexisting back then. I am talking about J2ME. It was a fun experience and was my first change to get something of mine working on mobile.

Various versions of the code were hanging around in folders all around my local disk and backups and eventually I decided to finish the project off with one last final rewrite, while trying to use some new concepts and design ideas.

I had come across component-based designs while reading game development books in the past, so dug into the topic further. It seemed that entity component system design was the lates trend, so I decided to give that a go.

## ECS vs OOP

If my career in software development has thought me something, it's that one size does not fit all. Whether it is a software product, an architecture design, a database - they all have their advantages and disadvantages. The trick is to pick the best one for one's particular use case.

The same is the case for ECS ([Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system)). It an architectural design that is most common in game development, where it tries to solve some limitations of OOP design that quickly become apparent. That does not mean that OOP is not used anymore - the contrary. Both are used together to achieve a more flexible design.

So it is not `ECS vs OOP`, rather `ECS with OOP`.

There is a lot that can be said about ECS and I will likely create a separate post to do exactly that. I might even use this project as a reference.

To keep this post short, I will say that using ECS has allowed me to avoid code duplication or complex object hierarchies.
Furthermore it allows me to easily assign properties to objects, even at level design, that would be next to impossible with a standard OOP class inheritence model.


## Summary

I admit that I kept this post short. To be honest, there was a lot more that I wanted to share and a lot more that could be told about the project itself and the design ideas behind it.

For some of those, I will follow up with other posts. For the rest, you should definitely have a look at the source code and the [README](https://github.com/mokiat/brick-destroyer/blob/master/README.md) of the repository. Both contain interesting concepts and ideas. They might not be the most polished but can motivate you to come with your own improvements.

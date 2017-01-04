---
layout: post
title: Mandelbrot Set
category: project
snippet: An old project of mine that visualizes the Mandelbrot Set.
---

The boundary of the **[Mandelbrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set)** is one visually astonishing fractal.

[![Thumbnail]({{ site.baseurl }}/assets/images/mandelbrot.png)](http://mokiat.com/mandelbrot/)

The goal of the **Mandelbrot Set** project was to create a software that would allow users to navigate through and explore the fractal.

You can see the end result here: [http://mokiat.com/mandelbrot/](http://mokiat.com/mandelbrot/)

The source code is available here: [https://github.com/mokiat/mandelbrot](https://github.com/mokiat/mandelbrot)


## History

The **Mandelbrot Set** project originally began as a university project. A few years later I wanted to play around with [AngularJS](https://angularjs.org/), [Bootstrap](http://getbootstrap.com/), and [Jasmine](http://jasmine.github.io/) so I decided to rewrite the whole thing in JavaScript.

One additional side effect was that anyone with a browser would be able to have a look at it, thanks to [GitHub Pages](https://pages.github.com/). Originally, I had written the whole thing in Java, and though it's a mature and easy language, it's deliverables are not easy to use by the average end user.


## Challenges

Aside from the initial learning curve, I can't say that I faced any issues with AngularJS or Bootstrap. Both were very straightforward to set up and use. In fact, I was surprised at how well both fit together and how smooth the development experience was.

I enjoyed Jasmine a lot. It is very similar to other BDD-style testing frameworks like RSpec (for Ruby) and Ginkgo (for Go), so the syntax was familiar to some extent. I had some experience with it from previous projects. Back then I would use a Rakefile configuration that was hard to set up right. For this project I used a Maven build configuration that was much easier to work with and much more stable.

Rendering a Mandelbrot Set is not as trivial as one might think. Getting the formula right and assigning colors at the border of the set is just part of the problem. The operation is quite CPU intensive. Most of the pixels of the output image would require multiple calculation passes. Some optimizations and clever thinking were in order.

There were some calculation optimizations that I put into place. For example, I avoided calculating vector lengths. Instead I used squared lengths, that are much faster to calculate (avoids the square root operation which is slow) and compared them with constants that were squared.

Low level optimizations would only get me part way, however. Zooming in on the Mandelbrot Set would increase the required number of computations drastically, so a higher level optimization was needed.

I decided to split the output image into regions. I would calculate and render each region in turn. This would allow me to hand over control to the UI temporarily before beginning a new region, thus preventing the page from freezing. This also created a really cool scanning effect. Since computations would become more intensive whenever users zoomed in, I would decrease the size of the regions and increase their number in return.

## Summary

Well, that's pretty much it. Have a look at the software and the code. By now, it is probably quite outdated but one might still be able to find interesting concepts.

title: Events and Event Delegation
previous:
  name: Traversing & Manipulating
  path: /chapter/traversing-manipulating
next:
  name: Effects
  path: /chapter/effects
links: 
  - name: jQuery Events Documentation
    path: http://api.jquery.com/category/events/
---

jQuery lets you listen for events that occur on an element. For example, this
code would listen for a user to click on any `a` element in the page:

    $("li").click(function(event) {
      console.log("clicked", $(this).text());
    });

Once you've "bound" an event handler to an element, you can trigger that event
handler using jQuery as well. Importantly, this only triggers event handlers
that were bound with JavaScript -- it doesn't trigger the default behavior of
the event.

    $("li").click();

Methods like `click()`, `blur()`, `change()`, and others are "shorthand"
methods for event binding. Under the hood, they all make use of jQuery's `on()`
method. You can use the `on()` method in your own code; indeed, doing so gives
you a lot more flexibility, as you'll see below. Here's what the `on()` method
looks like.

    $("li").on("click", function(event) {
      console.log("clicked", $(this).text());
    });

## Namespaced Events

One advantage that `on()` offers is the ability to use "namespaced" events.
When would you want to use namespaces? Consider a situation where you want to
*unbind* a click event handler. You could do it this way:

    $("li").off("click");

However, this will unbind *all* click handlers on all `a` elements, which may
have unintended consequences. If you originally bound your event handler using
a namespaced event, you could target that event handler specifically:

    $("li").on("click.mynamespace", function(event) {
      console.log("clicked", $(this).text());
    });

    // do some things

    $("li").off("click.mynamespace");

This code leaves other click handlers for `a` elements untouched.

Namespaces also work for triggering event handlers:

    $("li").trigger("click.mynamespace");

## Binding Multiple Events at Once

Another benefit of using `on()` is the ability to bind to multiple events at
once. For example, you might want to run the same code when a user scrolls the
window or when a user resizes the window. The `on()` method lets you pass both
events -- in a space-separated string -- followed by the function that you want
to handle both events:

    $(window).on("resize.foo scroll.bar", function(event) {
      console.log("The window has been resized or scrolled!");
    });



///////////////////
// The event object
///////////////////

// Whenever an event is triggered, the event handler function receives
// one argument, an event object. It has many properties.
$(document).on("click", function(event) {
  console.log(event.type);    // The event type, eg. "click"
  console.log(event.which);   // The button or kep that was pressed.
  console.log(event.target);  // The originating element.
  console.log(event.pageX);   // The document mouse X coordinate.
  console.log(event.pageY);   // The document mouse Y coordinate.
});

## The event object

Whenever an event is triggered, the event handler function receives
one argument, an event object. It has many properties.

    $(document).on("click", function(event) {
      console.log(event.type);    // The event type, eg. "click"
      console.log(event.which);   // The button or kep that was pressed.
      console.log(event.target);  // The originating element.
      console.log(event.pageX);   // The document mouse X coordinate.
      console.log(event.pageY);   // The document mouse Y coordinate.
    });

## Inside the event handler

    $("input").on("keydown", function(event) {
      // this: The element on which the event handler was bound.
      // event: The event object.

      // Change the input element's background to red if backspace was
      // pressed, otherwise green.
      $(this).css("background", event.which === 8 ? "red" : "green");
    });

## Preventing the default action

You've seen this before, right? Well, don't return false in your
event handlers! This can introduce problems with event delegation.

    $("a").on("click", function() {
      // Log stuff.
      console.log("I was just clicked!");
      // Prevent the default action AND stop event propagation.
      return false;
    });

By calling event.preventDefault() explicitly, only the default
action is prevented; propagation isn't stopped.

    $("a").on("click", function(event) {
      // Prevent the default action.
      event.preventDefault();
      // Log stuff.
      console.log("I was just clicked!");
    });

## Event bubbling

    // <html>
    //   <body>
    //     <div>
    //       <p><a href="#foo">I am a Link!</a></p>
    //     </div>
    //     <div>
    //       <p><a href="#bar">I am another Link!</a></p>
    //     </div>
    //   </body>
    // </html>

    // This is just for illustrative purposes!
    $("*").add([document, window]).on("click", function() {
      console.log(this);
    });

## Event delegation

With this markup:

    // <a href="#foo">I am a Link!</a>
    // <a href="#bar">I am another Link!</a>

    // This works like you'd expect, right?
    $("a").on("click", function(event) {
      event.preventDefault();
      console.log( $(this).attr("href") );
    });

How about with this markup?

    // <a href="#foo"><span>I am a Link!</span></a>
    // <a href="#bar"><b><i>I am another Link!</i></b></a>

It still works, even though you're not actually clicking the anchors.
You're really clicking the "span" or "i" descendant elements of the
anchors, but since they're inside the anchors, you're effectively
clicking the anchors. This behavior we take for granted is called
"event delegation."

We can bind event handlers on any parent element. But because `this`
is the element to which the event handler was bound, this example
isn't particularly interesting.

    $(document).on("click", function(event) {
      event.preventDefault();
      console.log(this);
    });

What if, instead of logging `this`, we logged event.target?

    $(document).on("click", function(event) {
      event.preventDefault();
      console.log(event.target);
    });

Instead of logging to the console, let's see it in the page.

    $(document).on("mouseover mouseout", function(event) {
      $(event.target).toggleClass("highlight");
    });

Knowing this, how might you utilize event delegation in your code?

    $(document).on("mouseover mouseout", function(event) {
      var elem = $(event.target);
      if ( elem.is("li") ) {
        elem.toggleClass("highlight");
      }
    });

Utilizing implicit iteration, the previous example could be written
more like this:

    $(document).on("mouseover mouseout", function(event) {
      $(event.target).filter("li").toggleClass("highlight");
    });

So, that works great when li elements are interacted with directly,
but it doesn't work well for descendant elements. How can we handle
both?

    $(document).on("mouseover mouseout", function(event) {
      $(event.target).closest("li").toggleClass("highlight");
    });

Internally, this is exactly what jQuery event delegation does. Except
the selector is specified between the event types and the handler,
`this` is the element that matched that selector, and it's MUCH more
efficient than if it was done manually with .closest().

    $(document).on("mouseover mouseout", "li", function(event) {
      $(this).toggleClass("highlight");
    });

And of course, because you're binding the event handler to a parent
element, you don't need to re-bind event handlers every time you add
new descendant elements matching that selector.

    $("li").clone().insertAfter("#content li");

## Stopping event propagation

    // <html>
    //   <body>
    //     <div>
    //       <p><a href="#foo">I am a Link!</a></p>
    //     </div>
    //     <div>
    //       <p><a href="#bar">I am another Link!</a></p>
    //     </div>
    //   </body>
    // </html>

    // This is just for illustrative purposes!
    $("*").add([document, window]).on("click", function() {
      console.log(this);
    });

So, what if you used `return false` to prevent the default action?
You'd also be stopping propagation, in a way that's not very easy
to troubleshoot. Don't return false in your event handlers!

    $("a").on("click", function() {
      // Log stuff.
      console.log("I was just clicked!");
      // Prevent the default action AND stop event propagation. Oops?
      return false;
    });

This prevents default, but doesn't stop propagation.

    $("a").on("click", function(event) {
      // Prevent the default action.
      event.preventDefault();
      // Log stuff.
      console.log("I was just clicked!");
    });

This stops event propagation, but doesn't prevent default.

    $("a").on("click", function(event) {
      // Stop event propagation.
      event.stopPropagation();
      // Log stuff.
      console.log("I was just clicked!");
    });

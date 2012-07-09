jQuery lets you listen for events that occur on an element. For example, this
code would listen for a user to click on any `a` element in the page:

    $("a").click(function(event) {
      console.log("clicked", $(this).attr("href"));
    });

Once you've "bound" an event handler to an element, you can trigger that event
handler using jQuery as well. Importantly, this only triggers event handlers
that were bound with JavaScript -- it doesn't trigger the default behavior of
the event.

    $("a").click();

Methods like `click()`, `blur()`, `change()`, and others are "shorthand"
methods for event binding. Under the hood, they all make use of jQuery's `on()`
method. You can use the `on()` method in your own code; indeed, doing so gives
you a lot more flexibility, as you'll see below. Here's what the `on()` method
looks like.

    $("a").on("click", function(event) {
      console.log("clicked", $(this).attr("href"));
    });

## Namespaced Events

One advantage that `on()` offers is the ability to use "namespaced" events.
When would you want to use namespaces? Consider a situation where you want to
*unbind* a click event handler. You could do it this way:

    $("a").off("click");

However, this will unbind *all* click handlers on all `a` elements, which may
have unintended consequences. If you originally bound your event handler using
a namespaced event, you could target that event handler specifically:

    $("a").on("click.mynamespace", function(event) {
      console.log("clicked", $(this).attr("href"));
    });

    // do some things

    $("a").off("click.mynamespace");

This code leaves other click handlers for `a` elements untouched.

Namespaces also work for triggering event handlers:

    $("a").trigger("click.mynamespace");

## Binding Multiple Events at Once

Another benefit of using `on()` is the ability to bind to multiple events at
once. For example, you might want to run the same code when a user scrolls the
window or when a user resizes the window. The `on()` method lets you pass both
events -- in a space-separated string -- followed by the function that you want
to handle both events:

    $(window).on("resize.foo scroll.bar", function(event) {
      console.log("The window has been resized or scrolled!");
    });


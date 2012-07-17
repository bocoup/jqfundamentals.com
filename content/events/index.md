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
code would listen for a user to click on any `li` element in the page:

    $('li').click(function(event) {
      console.log('clicked', $(this).text());
    });

Once you've "bound" an event handler to an element, you can trigger that event
handler using jQuery as well. Importantly, this only triggers event handlers
that were bound with JavaScript -- it doesn't trigger the default behavior of
the event. For example, if you trigger the click event of an `a` element, it
will not automatically navigate to the `href` of that element (though you could
write code that would make it do so).

    $('li').click();

Methods like `.click()`, `.blur()`, `.change()`, and others are "shorthand"
methods for event binding. Under the hood, they all make use of jQuery's `on()`
method (or the `.bind()` method prior to version 1.7). You can use the `.on()`
method in your own code; indeed, doing so gives you a lot more flexibility, as
you'll see below. Here's what the `.on()` method looks like.

    $('li').on('click', function(event) {
      console.log('clicked', $(this).text());
    });

## Namespaced Events

One advantage that `.on()` offers is the ability to use "namespaced" events.
When would you want to use namespaces? Consider a situation where you want to
*unbind* a click event handler. You could do it this way:

    $('li').off('click');

However, this will unbind *all* click handlers on all `li` elements, which may
have unintended consequences. If you originally bound your event handler using
a namespaced event, you could target that event handler specifically:

    $('li').on('click.mynamespace', function(event) {
      console.log('clicked', $(this).text());
    });

    // do some things

    $('li').off('click.mynamespace');

This code leaves other click handlers for `li` elements untouched.

Namespaces also work for triggering event handlers:

    $('li').trigger('click.mynamespace');

## Binding Multiple Events at Once

Another benefit of using `.on()` is the ability to bind to multiple events at
once. For example, you might want to run the same code when a user scrolls the
window or when a user resizes the window. The `.on()` method lets you pass both
events -- in a space-separated string -- followed by the function that you want
to handle both events:

    $(window).on('resize.foo scroll.bar', function(event) {
      console.log('The window has been resized or scrolled!');
    });

## The event object

Whenever an event is triggered, the event handler function receives one
argument, an event object that is normalized across browsers. This object has
many [useful properties](http://api.jquery.com/category/events/event-object/),
including the following:

    $(document).on('click', function(event) {
      console.log(event.type);    // The event type, eg. "click"
      console.log(event.which);   // The button or kep that was pressed.
      console.log(event.target);  // The originating element.
      console.log(event.pageX);   // The document mouse X coordinate.
      console.log(event.pageY);   // The document mouse Y coordinate.
    });

## Inside the event handler

When you specify a function to be used as an event handler, that function gets
access to the *raw DOM element* that initiated the event as `this`. If you want
to use jQuery to mainpulate the element, you will need to pass it to `$()`:

    $('input').on('keydown', function(event) {
      // this: The element on which the event handler was bound.
      // event: The event object.

      // Change the input element's background to red if backspace was
      // pressed, otherwise green.
      $(this).css('background', event.which === 8 ? 'red' : 'green');
    });

## Preventing the default action

Often, you'll want to prevent the default action of an event; for example, you
may want to handle a click on an `a` element using AJAX, rather than triggering
a full page reload. Many developers achieve this by having the event handler
return `false`, but this actually has another side effect: it stops the
*propagation* of the event as well, which can have unintended consequences.
The right way to prevent the default behavior of an event is to call the
`.preventDefault()` method of the event object.

    $('a').on('click', function(event) {
      // Prevent the default action.
      event.preventDefault();
      // Log stuff.
      console.log('I was just clicked!');
    });

This will allow the event to "bubble," which we'll explore below.

## Event bubbling

Consider the following code:

    $('*').add( [ document, window ] ).on('click', function(event) {
      event.preventDefault();
      console.log(this);
    });

It binds a click handler to all elements in a document (something you should
*never* do in real code), as well as to the `document` and `window`. What
happens when you click on an `a` element that's nested inside other elements?
In fact, the click event will be triggered for the `a` element as well as for
all of the elements that contain the `a` -- all the way up to the `document`
and the `window`. (You can click on the <i class="icon-eye-open"></i> icon to
try it in the sandbox yourself.)

This behavior is called event bubbling -- the event is triggered on the element
on which the user clicked, and -- unless you call `.stopPropagation()` on the
event object -- the event is then triggered all the way up the DOM.

You can see this more clearly when you consider the following markup:

    <a href="#foo"><span>I am a Link!</span></a>
    <a href="#bar"><b><i>I am another Link!</i></b></a>

And the following code:

    $('a').on('click', function(event) {
      event.preventDefault();
      console.log( $(this).attr('href') );
    });

When you click on "I am a Link!", you are not actually clicking on an `a`, but
rather on a `span` inside of an `a`. Nevertheless, the click event bubbles up
to the `a`, and the bound click handler fires.

## Event delegation

The bubbling behavior of events allows us to do "event delegation" -- binding
handlers to high-level elements, and then detecting which low-level element
initiated the event. For example, we could bind an event to an unordered list,
and then determine which element initiated the event:

    $('#my-unordered-list').on('click', function(event) {
      console.log( event.target ); // logs the element that initiated the event
    });

Of course, if our unordered list contains list items that contain other markup,
but we really only care about which list item was clicked, then this can get
messy in a hurry. Thankfully, jQuery provides a helper that lets us specify
which elements we care about, while still only binding to the high-level
element.

    $('#my-unordered-list').on('click', 'li', function(event) {
      console.log( this ); // logs the list item that was clicked
    });

Event delegation has two main benefits. First, it allows us to bind fewer event
handlers than we'd have to bind if we were listening to clicks on individual
elements, which can be a big performance gain. Second, it allows us to bind to
parent elements -- such as an unordered list -- and know that our event
handlers will fire as expected *even if the contents of that parent element
change*.

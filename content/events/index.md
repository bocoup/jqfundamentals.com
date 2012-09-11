title: Events and Event Delegation
sandbox: /sandbox/events
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

jQuery makes it easy to respond to user interaction with a web page. This means that you can write code that runs when a user clicks on a certain part of the page, or when she moves her mouse over a form element. For example, this
code listens for a user to click on any `li` element in the page:

    $( 'li' ).click(function( event ) {
      console.log( 'clicked', $( this ).text() );
    });

The code above selects all list items on the page, then binds a handler function to the click event of each list item using jQuery's `.click()` method.

Methods such as `.click()`, `.blur()`, `.change()`, and others are "shorthand"
methods for event binding. jQuery provides a number of these shorthand methods, each of which corresponds to a native DOM event:

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Native Event Name</th>
      <th>Shorthand Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>click</td>
      <td>`.click()`</td>
    </tr>
    <tr>
      <td>keydown</td>
      <td>`.keydown()`</td>
    </tr>
    <tr>
      <td>keypress</td>
      <td>`.keypress()`</td>
    </tr>
    <tr>
      <td>keyup</td>
      <td>`.keyup()`</td>
    </tr>
    <tr>
      <td>mouseover</td>
      <td>`.mouseover()`</td>
    </tr>
    <tr>
      <td>mouseout</td>
      <td>`.mouseout()`</td>
    </tr>
    <tr>
      <td>mouseenter</td>
      <td>`.mouseenter()`</td>
    </tr>
    <tr>
      <td>mouseleave</td>
      <td>`.mouseleave()`</td>
    </tr>
    <tr>
      <td>scroll</td>
      <td>`.scroll()`</td>
    </tr>
    <tr>
      <td>focus</td>
      <td>`.focus()`</td>
    </tr>
    <tr>
      <td>blur</td>
      <td>`.blur()`</td>
    </tr>
    <tr>
      <td>resize</td>
      <td>`.resize()`</td>
    </tr>
  </tbody>
</table>


Under the hood, all of the shorthand methods make use of jQuery's `.on()` method. You can use the `.on()` method in your own code; indeed, doing so gives you a lot more flexibility. When you use the `.on()` method, you pass the native event name as the first argument, and then the handler function as the second argument:

    $( 'li' ).on( 'click', function( event ) {
      console.log( 'clicked', $( this ).text() );
    });

Once you've "bound" an event handler to an element, you can trigger that event
handler using jQuery as well.

    $( 'li' ).trigger( 'click' );

If the event you want to trigger has a shorthand method (see the table above), you can also trigger the event by simply calling the shorthand method:

    $( 'li' ).click();

<div class="alert alert-info">
  When you `.trigger()` an event, you only trigger event handlers that were bound with JavaScript &mdash; you don't trigger the default behavior of the event. For example, if you trigger the click event of an `a` element, it will not automatically navigate to the `href` of that element (though you could write code that would make it do so).
</div>

Once you have bound an event, you can unbind the event using jQuery's `.off()` method. This will remove any event handlers that were bound to the specified event:

    $( 'li' ).off( 'click' );

## Namespaced events

One advantage that `.on()` offers is the ability to use "namespaced" events.
When would you want to use namespaces? Consider a situation where you bind some events, and then want to *unbind* some of the handlers. As we just saw, you could do it this way:

    ```<span class="caution">caution</span> antipattern
    $( 'li' ).on( 'click', function() {
      console.log( 'a list item was clicked' );
    });

    $( 'li' ).on( 'click', function() {
      registerClick();
      doSomethingElse();
    });

    $( 'li' ).off( 'click' );

However, this will unbind *all* click handlers on all `li` elements, which isn't what we want. If you bind an event handler using a *namespaced event*, you can target that event handler specifically:

    $( 'li' ).on( 'click.logging', function() {
      console.log( 'a list item was clicked' );
    });

    $( 'li' ).on( 'click.analytics', function() {
      registerClick();
      doSomethingElse();
    });

    $( 'li' ).off( 'click.logging' );

This code leaves our analytics-related click untouched, while unbinding our logging-related click.

We can also use namespaces to trigger only certain events:

    $( 'li' ).trigger( 'click.logging' );

## Binding multiple events at once

Another benefit of using `.on()` is the ability to bind to multiple events at
once. For example, you might want to run the same code when a user scrolls the
window or when a user resizes the window. The `.on()` method lets you pass both
events &mdash; in a space-separated string &mdash; followed by the function that you want
to handle both events:

    $( 'input[type="text"]' ).on('focus blur', function() {
      console.log( 'The user focused or blurred the input' );
    });

    $( window ).on( 'resize.foo scroll.bar', function() {
      console.log( 'The window has been resized or scrolled!' );
    });

## Passing named functions as event handlers

In all of our examples up until now, we've been passing anonymous functions as event handlers. However, you can create a function ahead of time and store it in a variable, then pass that variable as the event handler. This is useful if you want to use the same handler for different events or events on different elements.

    var handleClick = function() {
      console.log( 'something was clicked' );
    };

    $( 'li' ).on( 'click', handleClick );
    $( 'h1' ).on( 'click', handleClick );

## The event object

Whenever an event is triggered, the event handler function receives one
argument, an event object that is normalized across browsers. This object has
many [useful properties](http://api.jquery.com/category/events/event-object/),
including the following:

    $( document ).on( 'click', function( event ) {
      console.log( event.type );    // The event type, eg. "click"
      console.log( event.which );   // The button or key that was pressed.
      console.log( event.target );  // The originating element.
      console.log( event.pageX );   // The document mouse X coordinate.
      console.log( event.pageY );   // The document mouse Y coordinate.
    });

## Inside the event handler

When you specify a function to be used as an event handler, that function gets
access to the *raw DOM element* that initiated the event as `this`. If you want
to use jQuery to mainpulate the element, you will need to pass it to `$()`:

    $( 'input' ).on( 'keydown', function( event ) {
      // this: The element on which the event handler was bound.
      // event: The event object.

      // Change the input element's background to red if backspace was
      // pressed, otherwise green.
      $( this ).css( 'background', event.which === 8 ? 'red' : 'green' );
    });

## Preventing the default action

Often, you'll want to prevent the default action of an event; for example, you
may want to handle a click on an `a` element using AJAX, rather than triggering
a full page reload. Many developers achieve this by having the event handler
return `false`, but this actually has another side effect: it stops the
*propagation* of the event as well, which can have unintended consequences.
The right way to prevent the default behavior of an event is to call the
`.preventDefault()` method of the event object.

    $( 'a' ).on( 'click', function( event ) {
      // Prevent the default action.
      event.preventDefault();
      // Log stuff.
      console.log( 'I was just clicked!' );
    });

This will allow the event to "bubble," which we'll explore below.

## Event bubbling

Consider the following code:

    $( '*' ).add( [ document, window ] ).on( 'click', function( event ) {
      event.preventDefault();
      console.log( this );
    });

It binds a click handler to all elements in a document (something you should
*never* do in real code), as well as to the `document` and `window`. What
happens when you click on an `a` element that's nested inside other elements?
In fact, the click event will be triggered for the `a` element as well as for
all of the elements that contain the `a` &mdash; all the way up to the `document`
and the `window`. (You can click on the <i class="icon-eye-open"></i> icon to
try it in the sandbox yourself.)

This behavior is called event bubbling &mdash; the event is triggered on the element
on which the user clicked, and &mdash; unless you call `.stopPropagation()` on the
event object &mdash; the event is then triggered all the way up the DOM.

You can see this more clearly when you consider the following markup:

    <a href="#foo"><span>I am a Link!</span></a>
    <a href="#bar"><b><i>I am another Link!</i></b></a>

And the following code:

    $( 'a' ).on( 'click', function( event ) {
      event.preventDefault();
      console.log( $( this ).attr( 'href' ) );
    });

When you click on "I am a Link!", you are not actually clicking on an `a`, but
rather on a `span` inside of an `a`. Nevertheless, the click event bubbles up
to the `a`, and the bound click handler fires.

## Event delegation

The bubbling behavior of events allows us to do "event delegation" &mdash; binding
handlers to high-level elements, and then detecting which low-level element
initiated the event. For example, we could bind an event to an unordered list,
and then determine which element initiated the event:

    $( '#my-unordered-list' ).on( 'click', function( event ) {
      console.log( event.target ); // logs the element that initiated the event
    });

Of course, if our unordered list contains list items that contain other markup,
but we really only care about which list item was clicked, then this can get
messy in a hurry. Thankfully, jQuery provides a helper that lets us specify
which elements we care about, while still only binding to the high-level
element.

    $( '#my-unordered-list' ).on( 'click', 'li', function( event ) {
      console.log( this ); // logs the list item that was clicked
    });

    $( '<li>a new list item!</li>' ).appendTo( '#my-unordered-list' );

Event delegation has two main benefits. First, it allows us to bind fewer event
handlers than we'd have to bind if we were listening to clicks on individual
elements, which can be a big performance gain. Second, it allows us to bind to
parent elements &mdash; such as an unordered list &mdash; and know that our event
handlers will fire as expected *even if the contents of that parent element
change*.

For example, this code adds a new list item after the event delegation is set
up; clicking on the new item works just fine, without any additional event
binding code.

    $( '#my-unordered-list' ).on( 'click', 'li', function( event ) {
      console.log( this ); // logs the list item that was clicked
    });

    $( '<li>a new list item!</li>' ).appendTo( '#my-unordered-list' );

## Conclusion

In this section, we took a look at various ways to listen for user interaction
with our page, including how we can use event delegation to more efficiently
set up event handlers. In the next section, we'll look at how we can animate
elements using jQuery's effects methods.

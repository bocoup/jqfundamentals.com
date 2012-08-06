title: jQuery Basics
previous:
  name: JavaScript Basics
  path: /content/javascript-basics/
sandbox: /sandbox/jquery-basics
next:
  name: Traversing & Manipulating
  path: /chapter/traversing-manipulating
links:
  - name: jQuery API Documentation
    path: http://api.jquery.com/
  - name: Selector Documentation
    path: http://api.jquery.com/category/selectors/
---

The jQuery library makes it easy to manipulate a page of HTML after it's
displayed by the browser. It also provides tools that help you listen for a
user to interact with your page, tools that help you create animations in your
page, and tools that let you communicate with a server without reloading the
page.  We'll get to those in a bit. First, let's look at some jQuery basics,
and at how we can use jQuery to perform its core functionality: getting some
elements and doing something with them.

## What&rsquo;s $, anyway?

The jQuery library provides the `jQuery` function, which lets you select
elements using CSS selectors.

    var listItems = jQuery( 'li' );

Of course, if you've seen any jQuery code, you're probably more accustomed to
seeing something like this:

    var listItems = $( 'li' );

The `$` there is just a shorter, more convenient name for the `jQuery`
function; indeed, in the [jQuery source
code](https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js), you'll
find this near the end:

    // Expose jQuery to the global object
    window.jQuery = window.$ = jQuery;

When you call the `$()` function and pass a selector to it, you create a new
jQuery object. Of course, in JavaScript, functions are objects too, so that
means that `$` (and `jQuery`, of course) has properties and methods, too. For
example, you can refer to the `$.support` property for information on what the
current browser environment supports, and you use the `$.ajax` method to make
an AJAX request.

**For the rest of this guide, we'll use `$` instead of `jQuery` for the sake of
brevity. Note that if your page contains more than one JavaScript library, then
`$` may be used by another library, which can cause jQuery not to work. If you
experience this, you should consider using
[jQuery.noConflict](http://api.jquery.com/jQuery.noConflict/) before loading
the other libraries.**

## $(document).ready()

Before you can safely use jQuery to do anything to your page, you need to
ensure that the page is in a state where it's ready to be manipulated. With
jQuery, we accomplish this by wrapping our code in `$(document).ready()`.

    $( document ).ready(function() {
      console.log( 'ready!' );
    });

This will run the function that we pass to `.ready()` once the document is
ready. What's going on here? We're using `$(document)` to create a jQuery
object from our page's `document`, and then calling the `.ready()` function on
that object, passing it the function we want to execute.

Since this is something you'll find yourself doing a lot, there's a shorthand
method for this if you prefer -- the `$()` function does double duty as an
alias for `$(document).ready()` if you pass it a function:

    $(function() {
      console.log( 'ready!' );
    });

**For the rest of this guide, we'll assume that the code we're looking at is
enclosed in `$(document).ready(function() { ... });`, and we'll leave that part
out for brevity.**

## Get some elements

The simplest thing we can do with jQuery is get some elements and do something
with them. If you understand [CSS](https://developer.mozilla.org/en/CSS)
selectors, getting some elements is very straightforward: you simply pass the
appropriate selector to `$()`.

    $( '#header' ); // select the element with an ID of 'header'
    $( 'li' );      // select all list items on the page
    $( 'ul li' );   // select list items that are in unordered lists
    $( '.person' ); // select all elements with a class of 'person'

It's important to understand that any selection you make will only contain
elements that existed in the page when you made the selection. That is, if you
write `var anchors = $( 'a' );` and then add another `<a>` element to your page
later, then your `anchors` variable will not contain that new element.

### Other ways to create a jQuery object

In addition to passing a simple selector to `$()`, you can create jQuery
objects in a few other ways:

    // create a jQuery object from a DOM element
    $( document.body.children[0] );

    // create a jQuery object from a list of DOM elements
    $( [ window, document ] );

    // make a selection in the context of a DOM element
    var firstBodyChild = document.body.children[0];
    $( 'li', firstBodyChild );

    // make a selection in the context of another selection
    var paragraph = $( 'p' );
    $( 'a', paragraph );

### Did my selection get anything?

Sometimes, you'll only want to do something when your selection matches some
elements. Because the `$()` function *always* returns a jQuery object, and an
object is always truthy, you'll need to test the contents of your selection to
determine whether anything was found.

    if ( $( '#nonexistent' ) ) {
      // Wrong! This code will always run!
    }

    if ( $( '#nonexistent' ).length ) {
      // Correct! This code will only run if there's an element in your page
      // with an ID of 'nonexistent'
    }

### Getting single elements from a selection

If you need to work with the raw DOM element from a selection, you need to
access that element from the jQuery object. For example, if you wanted to
access an `<input>` element's `value` property directly, you would want to work
with the raw DOM element.

    var listItems = $( 'li' );
    var rawListItem = listItems[0]; // or listItems.get( 0 )
    var html = rawListItem.innerHTML;

Note that you *cannot* call jQuery methods on raw DOM elements. So, the
following will not work:

    var listItems = $( 'li' );
    var rawListItem = listItems[0];
    var html = rawListItem.html();
    // Object #<HTMLInputElement> has no method 'html'

If you need to work with a single element in a selection and you want to be
able to use jQuery methods on that element, then you can get a new jQuery
object containing a single element by using `.eq()` and passing the index of
the element you're after.

    var listItems = $( 'li' );
    var secondListItem = listItems.eq( 1 );
    secondListItem.remove();

## Creating new elements

The `$` function has one last role: creating new elements. If you pass an HTML
snippet to `$()`, it will create a new element in memory -- that is, the
element will be created, but it won't be placed on the page until you place it
on the page.

    $( '<p>' ); // creates a new <p> element with no content
    $( '<p>Hello!</p>' ); // creates a new <p> element with content
    $( '<p class="greet">Hello!</p>' ); // creates a new <p> with content and class

You can also create an element by passing an object with information about how
to create the element:

    $( '<p>', {
      html: 'Hello!',
      'class': 'greet'
    });

Note that we must quote the `class` property, as `class` is a reserved word in
JavaScript, and failing to quote it will cause errors in some browsers. See
[the jQuery documentation](http://api.jquery.com/jQuery/#jQuery2) for details
on the various properties you can include in the object.

We'll look at how to place created elements into the document in the next
chapter, which covers [traversing and
manipulating](/chapter/traversing-manipulating) the document.

## Working with selections

Once you've created a jQuery object that contains your selection, you probably
want to do something with your selection. Before we do that, though, there are
a few concepts that are key to understanding the jQuery way of doing things.

### Testing a selection

We can determine whether a selection meets certain criteria using the `.is()`
method. The most common way to use this method is to provide a selector as its
sole argument. It returns `true` or `false` depending on whether the selection
matches the selector:

    $( 'li' ).eq( 0 ).is( '.special' ); // false
    $( 'li' ).eq( 1 ).is( '.special' ); // true

You can also pass the `.is()` method a jQuery object, a raw DOM element, or
even a function if you need to do a more complex test. See [the
documentation](http://api.jquery.com/is/) for more details.

### Getters, setters, and implicit iteration

There are many methods you can call once you've made a selection. These methods
generally fall into two categories: getters and setters. Getters retrieve a
piece of information from the selection, and setters alter the selection in
some way. In almost all cases, getters operate only on the first element in a
selection (`.text()` is a notable exception); setters operate on *all* elements
in a selection, using what's known as *implicit iteration*.

Implicit iteration means that jQuery automatically iterates over all the
elements in a selection when you call a setter method on that selection. This
means that, when you want to do something to all of the elements in a
selection, you don't have to call a setter method on every item in your selection --
you just call the method on the selection itself, and jQuery iterates over the
elements for you.

Let's say that you want to change the HTML of all of the list items on your
page. To do this, we'd use the `.html()` method, which will change the HTML of
*all* of the selected list items.

    $( 'li' ).html( 'New HTML' );

As of jQuery 1.4, you can also pass a function to jQuery's setter methods. This
function's return value is used as the new value, and it receives two
arguments: the index of the element in the selection, and the old value of the
thing you're trying to change. This is useful when you need information about
an element's current state in order to properly set the new state.

    $( 'li' ).html(function( index, oldHtml ) {
      return oldHtml + '!!!'
    });

### Explicit iteration

Sometimes, the task you're trying to accomplish won't fit neatly into one of
jQuery's existing methods, and you'll need to explicitly iterate over a
selection. The `.each()` method lets you do this. In the following code, we use
it to add a `<b>` tag at the beginning of the list item, containing the index
of the list item.

    $( 'li' ).each(function( index, elem ) {
      // this: the current, raw DOM element
      // index: the current element's index in the selection
      // elem: same as this
      $( this ).prepend( '<b>' + index + ': </p>' );
    });

We can also use `.each()` to create a per-element closure -- that is, to take
advantage of the fact that variables are only accessible inside the function
where they are declared. This can be useful when we need to keep track of state
information for each element in a selection.

    $( 'li' ).each(function( index, elem ) {
      var clicked = false;
      var listItem = $( this );

      listItem.click(function( event ) {
        if (clicked) {
          listItem.addClass( 'again' );
        } else {
          listItem.addClass( 'clicked' );
        }
      });
    });

### Chaining

One of the most lucrative parts of jQuery is the ability to "chain" methods
together. This means that we can call a series of methods on a selection
without having to repeat the selection or store the selection in a variable. We
can even make new selections based on previous selections, all without breaking
the chain.

    $( 'li' )
      .click(function() {
        $( this ).addClass( 'clicked' );
      })
      .find( 'span' )
        .attr( 'title', 'Hover over me' );

Chaining is possible because every setter method in jQuery returns the
selection on which it was called. It's extraordinarily powerful, and it's a
feature that many libraries have adopted. However, it must be used with care.
Extensive chaining can make code *extremely* difficult to read, modify, and
debug. There is no hard-and-fast rule on how long a chain should be, but even
the simple chain above is probably worth refactoring for readability.

    var listItems = $( 'li' );
    var spans = listItems.find( 'span' );

    listItems
      .click(function() {
        $( this ).addClass( 'clicked' );
      });

    spans.attr( 'title', 'Hover over me' );

## Conclusion

We've gotten a great overview of how jQuery ticks; in the next section, we'll
take a look at how to actually start accomplishing things with it!

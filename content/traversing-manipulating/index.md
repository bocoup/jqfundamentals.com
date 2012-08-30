title: Traversing & Manipulating
sandbox: /sandbox/traversing-manipulating
previous:
  name: jQuery Basics
  path: /chapter/jquery-basics
next:
  name: Events & Event Delegation
  path: /chapter/events
links:
  - name: Traversal Documentation
    path: http://api.jquery.com/category/traversing/
  - name: Manipulation Documentation
    path: http://api.jquery.com/category/manipulation/
---

jQuery provides powerful tools for finding the element or elements you're
after, and then working with those elements to achieve a desired result.
Through its traversal and manipulation methods, it takes tasks that would be
rather painful to achieve using native DOM manipulation, and makes those tasks
fairly straightforward and intuitive.

In this chapter, we'll take a look at some (but not all) of those traversal and
manipulation methods. Before we do, though, there are a few important
vocabulary terms that you should know. Let's consider a bit of HTML:

    <ul>
        <li>
            <span>
                <i>Foo</i>
            </span>
        </li>
        <li>Bar</li>
    </ul>

- The first list item is a **child** of the unordered list.
- The unordered list is the **parent** of both list items.
- The span is a **descendant** of the unordered list.
- The unordered list is an **ancestor** of everything inside of it.
- The two list items are **siblings**.



## Traversal

jQuery lets us "traverse" -- or move through -- the HTML elements that make up our page. First, we make an initial selection, and then move through the DOM relative to that selection. As we move through the DOM, we're altering our original selection; in some cases, we're replacing the original selection with the new selection, while in other cases, we're adding to or subtracting from the original selection.

### Filtering selections

You can filter an existing selection to only include elements that match a
certain criteria. For example, you can filter a selection in the following ways:

    var listItems = $( 'li' );

    // filter the selection to only items with a class of 'special'
    var special = listItems.filter( '.special' );

    // filter the selection to only items without a class of 'special'
    var notSpecial = listItems.not( '.special' );

    // filter the selection to only items that contain a span
    var hasSpans = listItems.has( 'span' );

Importantly, note that `.not()` is *not* the opposite of `.is()`. The `.is()`
method returns a boolean, while the `.not()` method returns a new jQuery
object.

### Finding elements relative to a selection

An initial selection can serve as the "home base" for making additional
selections; for example, you may have an existing selection that contains an
individual list item, and then need to work with its siblings or the unordered
list that contains the item. You can make a new selection relative to an
existing selection easily:

    // get the first list item on the page
    var listItem = $( 'li' ).first(); // also: .last()

    // get the siblings of the list item
    var siblings = listItem.siblings();

    // get the next sibling of the list item
    var nextSibling = listItem.next(); // also: .prev()

    // get the list item's parent
    var list = listItem.parent();

    // get the list items that are immediate children of the list
    var listItems = list.children();

    // get ALL list items in the list, including nested ones
    var allListItems = list.find( 'li' );

    // find all ancestors of the list item that have a class of "module"
    var modules = listItem.parents( '.module' );

    // find the closest ancestor of the list item that has a class of "module"
    var module = listItem.closest( '.module' );

You can also add to an existing selection by using the `.add()` method.
You can pass it a selector, an array of elements, a string of HTML, or a jQuery
object.

    var list = $( '#my-unordered-list' );

    // do some stuff with the list, and then ...

    var listAndListItems = list.add( '#my-unordered-list li' );

### Getting back to your original selection

When you use one of the traversal methods to find some elements relative to an initial selection, jQuery stores a reference to your initial selection in case you want to get back to it. For example, consider a case where you select an unordered list, make some changes to its list items, and then want to work with the unordered list again. You can use the jQuery `.end()` method to get back to your original selection:

    $( '#my-unordered-list' )
      .find('li')

      // now we're working with the list items
      .addClass('special')

    .end()

    // now we're back to working with the list
    .addClass('super-special');

The `.end()` method makes it easy to make a lot of changes in a single statement. This practice does little for code clarity, though; it's a little like telling a story without stopping to take a breath. Because of this, you should use it sparingly. More often than not, it will lead to code that's difficult to read, maintain, and debug.

A better solution might look like this:

    var list = $( '#my-unordered-list' );
    var listItems = list.find('li');

    listItems.addClass( 'special' );
    list.addClass( 'super-special' );

jQuery also provides the `.addBack()` method if you want to add your original selection to your current selection. For example:

    $( 'li.special' )

      .siblings()

        // now we're working with the siblings of the original selection
        .removeClass( 'important' )

      .addBack()

      // now we're working with the original li's AND their siblings
      .addClass( 'urgent' );

Confused? Just like the `.end()` method can result in code that's difficult to work with, the `.addBack()` method -- while sometimes useful -- can easily lead to complex code. A better solution would use the `.add()` method to combine two original selections instead:

    var specialListItems = $( 'li.special' );
    var otherListItems = specialListItems.siblings();

    otherListItems.removeClass( 'important' );
    specialListItems.add( otherListItems ).addClass( 'urgent' );

There are several traversal methods we haven't covered here; you can read about
all of the traversal methods in the [traversing
documentation](http://api.jquery.com/category/traversing/).

## Manipulation

jQuery's manipulation methods allow you to alter the DOM of your page using a
syntax that's much friendlier than the one provided by native DOM manipulation
methods. Manipulation methods return the jQuery object on which they were called,
which means you can chain them or combine them with other jQuery methods such
as the ones discussed above.

### Altering elements

There are myriad ways to alter elements using jQuery. Here, we'll look at how
to achieve some of the most common tasks.

#### Adding and removing classes

The class attribute on an element can be used to target CSS rules, and can also
be a useful way to target jQuery selections. For example, an element may have a
class of `hidden`, with a corresponding CSS rule that causes elements with that
class to have their `display` set to `none`. Using jQuery, we can add and
remove classes to affect the display of elements.

    $( 'li' ).addClass( 'hidden' );
    $( 'li' ).eq( 1 ).removeClass( 'hidden' );

If your use case requires adding and removing a class repeatedly, jQuery provides the `.toggleClass()` method. The following code adds the class `hidden` if it is not present, and removes it if it is present.

    $( 'li' ).eq( 1 ).toggleClass( 'hidden' );

#### Changing style

<div class="alert alert-info">
    Whenever possible, you should use classes
combined with CSS rules to affect the *presentation* of elements, and use
jQuery only to add and remove those classes as shown above. In this section,
we'll see how to alter the style of an element directly, but CSS rules combined
with classes are always preferable if they can achieve the desired
effect.
</div>

When you can't achieve your goal via adding and removing classes, jQuery
provides the `.css()` method to allow you to set the style of elements
directly. This is usually required when you want to set numeric values that can
only be calculated at runtime -- for example, positioning information. The
`.css()` method should *not* be used to set simple styles, such as `display:
none` -- in almost all cases, it is preferable to achieve these changes via
classes and CSS.

For example, consider the case where you want to style an element based on the
width of its parent element; it might be difficult or impossible to know the
width of the parent element ahead of time in a flexible layout. In this case,
we might resort to the `.css()` method for styling.

    var list = $( '#my-unordered-list' );
    var width = Math.floor( list.width() * 0.1 );

    list.find('li').each(function( index, elem ) {
      var padding = width * index;
      $( elem ).css( 'padding-left', padding + 'px' );
    });

If you need to set multiple properties at once, you can pass an object to the
`.css()` method rather than a property name and a value. Note that you will
need to quote any property names that include a hyphen.

    $( 'li' ).eq( 1 ).css({
      'font-size': '20px',
      'padding-left': '20px'
    });

#### Changing form values

jQuery provides the `.val()` method for altering the value of form elements
such as `select` and `input` elements.

For text `input` elements, you can set their content by passing a string to the
`.val()` method:

    $( 'input[type="text"]' ).val( 'new value' );

For `select` elements, you can set the chosen option using `.val()` as well:

    $( 'select' ).val( '2' );

For checkbox `input` elements, you'll need to set the `checked` property on
the element using the `.prop()` method.

    $( 'input[type="checkbox"]' ).prop( 'checked', 'checked' );

<div class="alert alert-info">
    The `.prop()` method was introduced in jQuery 1.6; prior versions of jQuery used the `.attr()` method for this purpose. It continues to work in later versions of jQuery, but in the case of the `checked` property, it ultimately just calls the `.prop()` method. If you are using a version of jQuery later than 1.6, you should always use the `.prop()` method to set the `checked` property and other DOM element properties. See the [documentation](http://api.jquery.com/prop/) for a more detailed explanation.
</div>


#### Changing other attributes

You can use jQuery's `.attr()` method to change other attributes of elements.
For example, you can use it to set a new `title` attribute for a link:

    $( 'a' ).attr( 'title', 'Click me!' );

When setting an attribute, you can pass a function as the second argument. Just
like other setter methods, this function receives two arguments: the index of
the element on which it's operating, and the original value of the attribute.
This function should return the new value for the attribute.

    $( 'a' ).attr( 'href', function(index, value) {
      return value + '?special=true';
    });

You can also remove attributes entirely using `.removeAttr()`.


### Getting information from elements

In the [jQuery basics](/chapter/jquery-basics) chapter, we discussed the notion
of "getter" and "setter" methods. All of the methods that can be used to
change elements can also be used to get information from elements. For example,
the `.val()` method described above can be used as both a setter and a
getter.

    var input = $( 'input[type="text"]' );
    input.val( 'new value' );
    input.val(); // returns 'new value'

Likewise, the `.css()` method can be used to retrieve the value of individual
CSS properties by passing only a property name, not a value.

    var listItemColor = $( 'li' ).css( 'color' );

When manipulation methods are used as getters, *the method operates on only the
first element in the selection*, with one notable exception: the `.text()`
method. In the case of the `.text()` method, the text of *all* selected
elements will be returned if no argument is passed to the method.

### Placing elements in the document

Whether you've selected an element or created a new element, you can take your
selection and place it in your document. There are generally two ways to do
this: by calling a method on the element(s) you want to place, or by calling a
method on the element relative to which you want to place it.

For example, consider the case where you want to move the first list item in a
list to the end of the list. There are several ways to achieve this.

You could append the item to the list by calling `.appendTo()` on the list
item:

    var listItem = $( '#my-unordered-list li' ).first();
    listItem.appendTo( '#my-unordered-list' );

You could append the item to the list by calling `.append()` on the list:

    var listItem = $( '#my-unordered-list li' ).first();
    $( '#my-unordered-list' ).append( listItem );

You could insert the list item after the last list item by calling
`.insertAfter()` on the list item that you want to move:

    var listItems = $( '#my-unorderd-list li' );
    listItems.first().insertAfter( listItems.last() );

You could also insert the list item after the last list item by calling
`.after()` on the last list item:

    var listItems = $( '#my-unordered-list li' );
    listItems.last().after( listItems.first() );

There are many other methods for placing elements -- you can place them
[around](http://api.jquery.com/category/manipulation/dom-insertion-around/),
[inside](http://api.jquery.com/category/manipulation/dom-insertion-inside/),
and
[outside](http://api.jquery.com/category/manipulation/dom-insertion-outside/)
of other elements, depending on your specific needs.

The most effective way to place an element depends on the elements to which you
already have access. In the example above, you might choose to append the list
item to the unordered list if you have already selected the unordered list for
some other purpose; or, if you already had a selection containing all of the
list items, then placing the first list item relative to the last list item
might be the easiest path.

When choosing how to place an element, you should consider not only the easiest
way to place it, but also the most maintainable way. Beware of placements that
make assumptions about the exact structure of your page's HTML.

### Copying elements

You can make a copy of an element or a set of elements using jQuery's
`.clone()` method. This will make a copy of the elements, but note that the
copy is only in memory -- you will need to place it in the document yourself.
You can manipulate the cloned element or elements before placing them into the
document.

    var clones = $( 'li' ).clone();

    clones.html(function( index, oldHtml ) {
      return oldHtml + '!!!';
    });

    $( '#my-unordered-list' ).append( clones );

<div class="alert alert-info">
  **Note:** jQuery will not prevent you from
cloning an element with an ID, but you should ensure that you change or remove
the cloned element's `id` attribute before inserting it into the document, as a
document should never have more than one element with a particular ID.
</div>

### Removing elements

There are three ways to remove elements from the document: `.remove()`,
`.detach()`, and `.replaceWith()`. Each method serves a particular purpose.

The `.remove()` method should be used to remove elements permanently, as it
will also unbind any event handlers attached to the elements being removed. The
`.remove()` method returns a reference to the removed elements, but if you
re-add the removed elements, the removed elements will no longer have events
bound to them.

    $( '#my-unordered-list li' ).click(function() {
      alert $( this ).text();
    });

    var removedListItem = $( '#my-unordered-list li' ).first().remove();

    removedListItem.appendTo( '#my-unordered-list' );
    removedListItem.trigger( 'click' ); // no alert!

The `.detach()` method is useful for temporarily removing elements from the document; for example, if you are going to make a lot of changes to your page's structure using jQuery, it will be more efficient to use `.detach()` to remove the affected elements, make your changes, and then re-attach the element using one of the insertion methods. Elements removed with `.detach()` will retain their event handlers; you can re-add them to the document with

    $( '#my-unordered-list li' ).click(function() {
      alert $( this ).text();
    });

    var detachedListItem = $( '#my-unordered-list li' ).first().detach();

    // do something complicated with the list item

    detachedListItem.appendTo( '#my-unordered-list' );
    detachedListItem.trigger( 'click' ); // alert!

Finally, the `.replaceWith()` method replaces an element or elements with the
element or HTML passed as an argument to `.replaceWith()`. The replaced
elements are returned, but just like with `.remove()`, all event handlers are
unbound from the replaced elements.

    $( '#my-unordered-list li' ).click(function() {
      alert $( this ).text();
    });

    var replacedListItem = $( '#my-unordered-list li' ).first()
      .replaceWith( '<li>new!</li>' );

    replacedListItem.appendTo( '#my-unordered-list' );

    replacedListItem.trigger( 'click' ); // no alert!

## Conclusion

In this section, we looked at various ways we can move through a document, move
elements and place new elements in the document, and make changes to elements.
In the next section, we'll look at how to listen for user interaction with our
page.

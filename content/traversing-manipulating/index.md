title: Traversing & Manipulating
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
vocabulary terms that you should know:

- **child**: An element that is an *immediate* descendant of another element.
  For example, in the markup `<li><span><i>foo</i></span></li>`, the `span` is
  a child of the `li`, while the `i` is just a descendant of the `li`. An
  element can have zero or more children.
- **parent**: An element that is the *immediate* ancestor of another element.
  For example, in the markup `<li><span><i>foo</i></span></li>`, the `span` is
  the parent of the `i`, while the `li` is an ancestor of the `i`. An element
  has exactly one parent.
- **siblings**: Elements that share the same parent element. For example, in
  the markup `<ul><li>foo</li><li>bar</li></ul>`, the two `li` elements are
  siblings.

## Traversal

jQuery lets us "traverse" a page's DOM. First, we make an initial selection,
and then move through the DOM relative to that selection. As we move through
the DOM, we're altering our original selection; in some cases, we're replacing
the original selection with the new selection, while in other cases, we're
adding to or subtracting from the original selection.

### Filtering selections

You can filter an existing selection to only include elements that match a
certain criteria. For example, you can filter a selection in the following ways:

    var listItems = $('li');

    // filter the selection to only items with a class of 'special'
    var special = listItems.filter('.special');

    // filter the selection to only items without a class of 'special'
    var notSpecial = listItems.not('.special');

    // filter the selection to only items that contain a span
    var hasSpans = listItems.has('span');

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
    var listItem = $('li').first(); // also: .last()

    // get the siblings of the list item
    var siblings = listItem.siblings();

    // get the next sibling of the list item
    var nextSibling = listItem.next(); // also: .prev()

    // get the list item's parent
    var list = listItem.parent();

    // get the list items that are immediate children of the list
    var listItems = list.children();

    // get ALL list items in the list, including nested ones
    var allListItems = list.find('li');

    // find all ancestors of the list item that have a class of "module"
    var modules = listItem.parents('.module');

    // find the closest ancestor of the list item that has a class of "module"
    var module = listItem.closest('.module');

You can also add to an existing selection by using the `.add()` method.
You can pass it a selector, an array of elements, a string of HTML, or a jQuery
object.

    var list = $('#my-unordered-list');

    // do some stuff with the list, and then ...

    var listAndListItems = list.add('#my-unordered-list li');

If you change a selection by using one of the traversal methods, you can
restore your original selection using `.end()`, or add your original selection
to the new selection using `.andSelf()`.

    var list = $('#my-unordered-list');

    var listAndListItems = list.find('li').andSelf();

    var justTheList = $('#my-unordered-list')
      .find('li').addClass('awesome').end();

<div class="alert alert-info"> **Note:** The `.end()` method makes it easy to
write long chains without ever stopping to take a breath, and because of this,
it should be used sparingly. It is often better to store multiple selections in
variables, rather than to try to write a long chain that makes use of `.end()`
to get back to some original selection.  While `.end()` can be useful, if you
find yourself using it often, it's likely you should reconsider your approach.
</div>

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

#### Changing style

#### Changing other attributes


### Placing elements in the document

Whether you've selected an element or created a new element, you can take your
selection and place it in your document. There are generally two ways to do
this: by calling a method on the element(s) you want to place, or by calling a
method on the element relative to which you want to place it.

For example, consider the case where you want to move the first list item in a
list to the end of the list. There are several ways to achieve this.

You could append the item to the list by calling `.appendTo()` on the list
item:

    var listItem = $('#my-unordered-list li').first();
    listItem.appendTo('#my-unordered-list');

You could append the item to the list by calling `.append()` on the list:

    var listItem = $('#my-unordered-list li').first();
    $('#my-unordered-list').append(listItem);

You could insert the list item after the last list item by calling
`.insertAfter()` on the list item that you want to move:

    var listItems = $('#my-unorderd-list li');
    listItems.first().insertAfter(listItems.last());

You could also insert the list item after the last list item by calling
`.after()` on the last list item:

    var listItems = $('#my-unordered-list li');
    listItems.last().after(listItems.first());

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

    var clones = $('li').clone();
    clones.html( function( index, oldHtml ) { return oldHtml + '!!!'; } );
    $('#my-unordered-list').append(clones);

<div class="alert alert-info">**Note:** jQuery will not prevent you from
cloning an element with an ID, but you should ensure that you change or remove
the cloned element's `id` attribute before inserting it into the document, as a
document should never have more than one element with a particular ID.</div>

### Removing elements

There are three ways to remove elements from the document: `.remove()`,
`.detach()`, and `.replaceWith()`. Each method serves a particular purpose.

The `.remove()` method should be used to remove elements permanently, as it
will also unbind any event handlers attached to the elements being removed. The
`.remove()` method returns a reference to the removed elements, but if you
re-add the removed elements, the removed elements will no longer have events
bound to them.

    $('#my-unordered-list li').click(function() {
      alert $(this).text();
    });

    var removedListItem = $('#my-unordered-list li').first().remove();

    removedListItem.appendTo('#my-unordered-list');
    removedListItem.trigger('click'); // no alert!

The `.detach()` method is useful for temporarily removing elements from the
document; for example, if you need to do complex manipulations that would cause
frequent reflows or repaints, you could use `.detach()` to temporarily remove
the affected elements from the document before you do the complex
manipulations. Elements removed with `.detach()` will retain their event
handlers; you can re-add them to the document with

    $('#my-unordered-list li').click(function() {
      alert $(this).text();
    });

    var detachedListItem = $('#my-unordered-list li').first().detach();

    detachedListItem.appendTo('#my-unordered-list');
    detachedListItem.trigger('click'); // alert!

Finally, the `.replaceWith()` method replaces an element or elements with the
element or HTML passed as an argument to `.replaceWith()`. The replaced
elements are returned, but just like with `.remove()`, all event handlers are
unbound from the replaced elements.

    $('#my-unordered-list li').click(function() {
      alert $(this).text();
    });

    var replacedListItem = $('#my-unordered-list li').first()
      .replaceWith('<li>new!</li>');

    replacedListItem.appendTo('#my-unordered-list');

    replacedListItem.trigger('click'); // no alert!

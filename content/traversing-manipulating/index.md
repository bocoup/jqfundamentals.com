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

## Manipulation

### Altering elements

### Moving elements

### Copying elements

### Removing elements


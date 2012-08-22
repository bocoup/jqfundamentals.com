title: JavaScript Basics
sandbox: /sandbox/javascript-basics
previous:
  name: Home
  path: /
next:
  name: jQuery Basics
  path: /chapter/jquery-basics
links:
  - name: 'MDN: JavaScript'
    path: https://developer.mozilla.org/en/JavaScript
  - name: Chrome Developer Tools Overview
    path: https://developers.google.com/chrome-developer-tools/docs/overview
  - name: 'Fixing these jQuery: A Guide to Debugging'
    path: http://fixingthesejquery.com
  - name: Chrome Developer Tools Cheat Sheet
    path: https://github.com/borismus/DevTools-Lab/raw/master/cheatsheet/chromedev-cheatsheet.pdf
  - name: 'Chrome Dev Tools: 12 Tricks to Develop Quicker (video)'
    path: http://www.youtube.com/watch?v=nOEw9iiopwI
---

jQuery is built on top of JavaScript, a rich and expressive language in its own
right. This section covers the basic concepts of JavaScript, as well as some
frequent pitfalls for people who have not used JavaScript before. While it will
be of particular value to people with no programming experience, even people
who have used other programming languages may benefit from learning about some
of the peculiarities of JavaScript.

Here's a simple JavaScript program that adds a message to the page:

    // create a function that will greet a person,
    // and assign the function to the `greet` variable
    var greet = function( person, message ) {
      var greeting = 'Hello, ' + person + '!';
      print( greeting + ' ' + message );
    };

    // use the function to greet Jory, passing in her
    // name and the message we want to use
    greet( 'Jory', 'Welcome to JavaScript' );

    // use the function to greet Rebecca, passing in her
    // name and a different message
    greet( 'Rebecca', 'Thanks for joining us' );

<div class="alert alert-info">In the above example, we use a function called <code>print</code>. This is a helper function that is defined by the JavaScript that powers this site -- it is not a built-in JavaScript function.</div>

You can try running this program by clicking the <i class="icon-eye-open"></i>
and it will copy the code to the built-in editor automatically. Once it's
there, you can click the <i class="icon-play"></i> button to execute it; you
can also make changes to it. Press the <i class="icon-repeat"></i> button to
return to the original code.

It's OK if you don't understand everything that's going on in this program; in the rest of this section, we'll talk about functions, variables, and several other building blocks of JavaScript.

## Comments

Comments can be a useful tool for explaining what's happening in a piece of code. Some people like to heavily comment their code, while others prefer to include comments only to explain things that may not be immediately obvious.

JavaScript allows for single-line and multi-line comments. A single-line comment begins with `//`; a multi-line comment begins with `/*` and ends with `*/`.

    // This is a single line comment
    var foo;

    /*
      This is a multi-line comment. It can go on
      for several lines, like this.
     */

You'll also sometimes see multi-line comments used for inline comments:

    function cornify( unicorns /* integer */, rainbows /* integer */ ) {

    }

## Variables

In our example code above, we created a variable named `greeting` inside of our `greet` function.

Variables that are declared inside a function with a `var` statement are only
available inside of the function; this is generally desirable, and all
variables should be declared with a `var` statement unless they are intended
to be "global" -- that is, available anywhere in your code. This usually isn't
what you want, unless you want it to be possible for other code to change the
value of the variable.

What does it mean that a variable is only accessible inside of a function? Give
the following code a try (make sure your browser's
[console](https://developers.google.com/chrome-developer-tools/docs/console) is
open):

    var myFunction = function() {
      var foo = 'bar';
    };

    myFunction();
    console.log(typeof foo); // undefined!

In the example above, if we'd tried to actually use `foo` outside of the function -- rather than just checking its type -- our browser would have thrown an error.

The next example shows how we can have two variables with the same name, as long as each variable exists in a separate scope. In this example, we declare the variable `foo` and assign it the value `'qux'`; then, inside a function, we declare another variable named `foo`, and assign it the value `'bar'`. Notice how, outside of the function, the variable `foo` does not change, even when we create the variable `foo` inside the function.

    var foo = 'qux';
    var myFunction = function() {
      var foo = 'bar';
    };

    console.log(foo); // 'qux'
    myFunction();
    console.log(foo); // still 'qux'

Variable scope is one of the fundamental concepts of JavaScript, and one of the
concepts that people struggle with often. It's important to remember that:

- you should almost always declare variables with a `var` statement
- variables declared inside of a function using a `var` statement are not
  available outside of that function
- variables declared without a `var` statement are always global

You can define one variable per statement:

    var a = 1;
    var b = 'two';

You can also define multiple variables in a single statement, by separating them with commas:

    var a = 1,
        b = 'two';

Beware that variables that are not declared with the `var` keyword are
implicitly global! In the following example, the variable `a` is available outside the function because it wasn't declared with the `var` keyword -- this is generally undesirable.

    function test() {
      a = 1;
    }

    test();

    console.log( a ); // 1

## Arrays

## Objects

## Functions

## JavaScript gotchas

In addition to variable scope, there are many other gotchas in JavaScript.
Let's take a look at a few of them.

### Naming things

Valid names in JavaScript begin with a letter or certain symbols, followed by
zero or more letters, digits, underscores, or symbols. Names may not begin with
numbers, and may not include hyphens. Besides these rules, you can name your variables however you'd like! All of these names are valid:

- `a`
- `a1`
- `foo_bar`
- `fooBarBaz`
- `$fooBar`
- `_foo`
- `__foo__`

There are some conventions that people use when naming things in JavaScript, but these are optional, and don't have any effect on how the code works:

- Names that begin with `_` are usually "private" (more on this later).
- Names that begin with uppercase letters are usually "constructors," used to create new instances of objects (more on this later as well).
- In code that uses jQuery, names that begin with `$` usually refer to jQuery objects.

### Reserved words

JavaScript reserves certain words for its own use; you should avoid using these
words for the names of things.

<pre>
abstract boolean break byte case catch char class const continue debugger
default delete do double else enum export extends false final finally float
for function goto if implements import in instanceof int interface long
native new null package private protected public return short static super
switch synchronized this throw throws transient true try typeof var
volatile void while with
</pre>

If you must use one of these names as the name of an object property, you
should quote the property name:

    var myObject = {
      'class': 'tasty'
    };

### Operations on numbers and strings

JavaScript represents all numbers as 64-bit floats. This means that operations
on numbers can be unpredictable:

    console.log( 0.0001 + 0.0002 ); // 0.00030000000000000003

JavaScript is a loosely-typed language. If you try to do mathematical
operations using values that are not numbers, *JavaScript will not throw
errors*, and the result may not be what you'd expect.

    console.log( 'a' + 2 );           // 'a2'
    console.log( '4' + 3 );           // '43'
    console.log( 'five' - '4' );      // NaN (not a number)
    console.log( - '1' );             // -1
    console.log( 1 + true );          // 2
    console.log( 1 == true );         // true
    console.log( 1 === true );        // false

### Logic and Truthiness

JavaScript provides `if` and `else`, as well as the *ternary operator*, to allow us to do certain things only when certain conditions are met. JavaScript determines whether a condition is met by evaluating a value or an expression for its "truthiness." Because JavaScript is a dynamically typed language, we can use any value or combination of values; however, the rules by which JavaScript determines whether a given value or expression is `true` or `false` can be confusing.

Here's an example of a simple `if` statement in JavaScript. It evaluates the truthiness of the number `1`; because `1` is truthy, the code inside the block -- delineated by `{` and `}` -- will run.

    if ( 1 ) {
      // this code will run!
    }

As it turns out, ost values in JavaScript are truthy -- in fact, there are only five values in JavaScript that are falsy:

- `undefined` (the default value of declared variables that are not assigned a
  value)
- `null`
- `NaN` ("not a number")
- `0` (the number zero)
- `''` (an empty string)

When we want to test whether a value is "falsy," we can use the `!` operator:

    if ( !a ) {
      // this code will run if a is false
    }

The value `NaN` is a special case. Values that are `NaN` will evaluate to false
in a simple conditional expression:

    var notANumber = 'four' - 'five';
    if ( !notANumber ) {
      // this code will run
    }

However, if we compare the value `NaN` to `false`, we get back a falsy value:

    var notANumber = 'four' - 'five';
    if ( notANumber == false ) {
      // this code will not run!
    } else {
      // this code will run
    }

It's important to remember that *all other values aside from the five values
listed above* are truthy. This includes empty arrays, empty objects, all
non-empty strings (including the string `'0'`), and all numbers other than `0`.

## Further reading

We've only scratched the surface of JavaScript. The Mozilla Developer Network
is an excellent resource for information about the JavaScript language,
particularly their [JavaScript
Guide](https://developer.mozilla.org/en/JavaScript/Guide). Specifically, you'll
do well to read the following articles:

- [JavaScript Overview](https://developer.mozilla.org/en/JavaScript/Guide/JavaScript_Overview)
- [Values, variables, and literals](https://developer.mozilla.org/en/JavaScript/Guide/Values%2C_Variables%2C_and_Literals)
- [Functions](https://developer.mozilla.org/en/JavaScript/Guide/Functions)
- [Arrays](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/)

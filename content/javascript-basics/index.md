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

Here's a simple JavaScript program:

    var greet = function( person, message ) {
      var greeting = 'Hello, ' + person + '!';

      var p = document.createElement('p');
      p.innerHTML = greeting + ' ' + message;
      document.body.appendChild(p);
    };

    greet( 'Jory', 'Welcome to JavaScript' );
    greet( 'Rebecca', 'Thanks for joining us' );

You can try running this program by clicking the <i class="icon-eye-open"></i>
and it will copy the code to the built-in editor automatically. Once it's
there, you can click the <i class="icon-play"></i> button to execute it; you
can also make changes to it. Press the <i class="icon-repeat"></i> button to
return to the original code.

When you run this simple program, it adds a paragraph element to the HTML to
the right of the editor. Let's look at the code sample again, this time with
some comments to explain what's going on.

    // we create a function and assign it to the `greet`
    // variable; later, we can use this function over and
    // over again in our code
    var greet = function( person, message ) {

      // we create another variable, `greeting`, and store
      // our greeting in it. note that this variable is not
      // available outside of the function!
      var greeting = 'Hello, ' + person + '!';

      // we create a new paragraph element, and set its HTML
      // by concatenating the greeting and the message
      var p = document.createElement('p');
      p.innerHTML = greeting + ' ' + message;

      // finally, we insert the paragraph element that we created
      // into our document
      document.body.appendChild( p );
    };

    // once we've defined the `greet` function, we can call it
    // as many times as we'd like, passing different arguments
    // that will result in different output
    greet( 'Jory', 'Welcome to JavaScript' );
    greet( 'Rebecca', 'Thanks for joining us' );

There are a couple of important things to realize just from this simple
example:

- Whitespace does not matter in JavaScript, except inside of strings.
- Variables that are declared inside a function with a `var` statement are only
  available inside of the function; this is generally desirable, and all
  variables should be declared with a `var` statement unless they are intended
  to be "global" -- that is, available anywhere in your code. If you intend a
  variable to be global, you should set it as a property of the built-in
  `window` object.

What does it mean that a variable is only accessible inside of a function? Give
the following code a try (make sure your browser's
[console](https://developers.google.com/chrome-developer-tools/docs/console) is
open):

    var myFunction = function() {
      var foo = 'bar';
    };

    myFunction();
    console.log(foo); // ReferenceError: foo is not defined

Variable scope is one of the fundamental concepts of JavaScript, and one of the
concepts that people struggle with often. It's important to remember that:

- you should almost always declare variables with a `var` statement
- variables declared inside of a function using a `var` statement are not
  available outside of that function
- variables declared without a `var` statement are always global

## JavaScript gotchas

In addition to variable scope, there are many other gotchas in JavaScript.
Let's take a look at a few of them.

### Naming things

Valid names in JavaScript begin with a letter or certain symbols, followed by
zero or more letters, digits, underscores, or symbols. Names may not begin with
numbers, and may not include hyphens. The following are valid names:

- `a`
- `a1`
- `foo_bar`
- `fooBarBaz`
- `$fooBar`
- `_foo`
- `__foo__`

Names that begin with `_` are usually "private," but this is only a matter of
convention, not a feature of the JavaScript language. In code that uses jQuery,
names that begin with `$` usually refer to jQuery objects.

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

### Variables

You can define one variable per statement:

    var a = 1;
    var b = 'two';

You can also define multiple variables in a single statement:

    var a = 1,
        b = 'two';

Beware that variables that are not declared with the `var` keyword are
implicitly global!

    function test() {
      a = 1;
    }

    test();

    console.log( window.a == 1 ); // true! ohnoes!

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

### Truthiness

Because JavaScript is loosely typed, values that are not booleans can be used
in logical expressions.

    if ( 1 ) {
      // this code will run!
    }

We talk about how a value will behave in a logical expression in terms of the
value's "truthiness" or "falsiness." Most values in JavaScript are truthy --
indeed, there are only five values in JavaScript that are falsy:

- `undefined` (the default value of declared variables that are not assigned a
  value)
- `null`
- `NaN` ("not a number")
- `0` (the number zero)
- `''` (an empty string)

An easy way to test whether a value is false is using the `!` operator:

    if ( !a ) {
      // this code will run if a is false
    }

The value `NaN` is a special case; values that are `NaN` will evaluate to false
in a simple logical expression ...

    var notANumber = 'four' - 'five';
    if ( !notANumber ) {
      // this code will run
    }

... The value `NaN` itself is not equivalent to `false`:

    var notANumber = 'four' - 'five';
    if ( notANumber == false ) {
      // this code will not run!
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

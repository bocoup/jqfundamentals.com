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

<div class="alert">In the above example, we use a function called <code>print</code>. This is a helper function that is defined by the JavaScript that powers this site -- it is not a built-in JavaScript function.</div>

You can try running this program by clicking the <i class="icon-eye-open"></i>
and it will copy the code to the built-in editor automatically. Once it's
there, you can click the <i class="icon-play"></i> button to execute it; you
can also make changes to it. Press the <i class="icon-repeat"></i> button to
return to the original code.

It's OK if you don't understand everything that's going on in this program; in the rest of this section, we'll talk about variables, functions, and several other building blocks of JavaScript.

## A comment about comments

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

## The building blocks of JavaScript

### Variables

Variables are the way that we store values so we can use them later. Variables can contain any value -- strings, numbers, arrays, objects, even functions. We declare a variable using a `var` statement:

    var myName = 'Rebecca';

Variable names can be just about anything, as long as they don't begin with a number and don't include a hyphen.

You can define one variable per statement:

    var a = 1;
    var b = 'two';

You can also define multiple variables in a single statement, by separating them with commas:

    var a = 1,
        b = 'two';

Once you have assigned a value to a variable, you can use that variable whenever you want to get access to the value you stored.

    print( myName ); // prints 'Rebecca'

Variables are a key ingredient in adhering to the *Don't Repeat Yourself* philosophy. If you need to use a value more than once, you probably want to store it in a variable.

We'll talk more about variables in the next section, Functions.

### Functions

Functions are a fundamental building block of JavaScript programs; they provide a way that we can put small pieces of functionality in a neatly-wrapped package. For example, consider a function that adds two numbers:

    function(a, b) {
      return a + b;
    }

This function takes two **arguments**, `a` and `b`. It adds them together, and returns the result.

This is a valid bit of JavaScript, but as written, there's no way for us to *call* our function if we actually want to add two things. We can solve this by assigning our function to a variable:

    var addTwoNumbers = function(a, b) {
      return a + b;
    };

What we've done here is take a **function expression** and assign it to a variable. Now that we've done this, we can call our function by using the name of the variable:

    print( addTwoNumbers(1, 1) ); // prints 2

We could also use a **function declaration** to give our function a name:

    function addTwoNumbers(a, b) {
      return a + b;
    }

This lets us call our function just like we did before, but this approach should be used with caution, as explained [in this post](http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/).

Bottom line: naming functions using the function declaration approach can have unexpected results if you don't fully understand a feature of JavaScript known as hoisting. The details of hoisting are beyond the scope of this guide, but for now we'll stick to assigning function expressions to variables.

#### Functions and variable scope

Variables that are declared inside a function with a `var` statement are only
available inside of the function; this is generally desirable, and all
variables should be declared with a `var` statement unless they are intended
to be "global" -- that is, available anywhere in your code. This usually isn't
what you want, unless you want it to be possible for other code to change the
value of the variable.

What does it mean that a variable is only accessible inside of a function? Give
the following code a try:

    var myFunction = function() {
      var foo = 'bar';
    };

    myFunction();
    print( typeof foo ); // prints undefined!

In the example above, if we'd tried to actually use `foo` outside of the function -- rather than just checking its type -- our browser would have thrown an error.

The next example shows how we can have two variables with the same name, as long as each variable exists in a separate scope. In this example, we declare the variable `foo` and assign it the value `'qux'`; then, inside a function, we declare another variable named `foo`, and assign it the value `'bar'`. Notice how, outside of the function, the variable `foo` does not change, even when we create the variable `foo` inside the function.

    var foo = 'qux';
    var myFunction = function() {
      var foo = 'bar';
    };

    print( foo ); // prints 'qux'
    myFunction();
    print( foo ); // still prints 'qux'

Variable scope is one of the fundamental concepts of JavaScript, and one of the
concepts that people struggle with often. It's important to remember that:

- you should almost always declare variables with a `var` statement
- variables declared inside of a function using a `var` statement are not
  available outside of that function
- variables declared without a `var` statement are always global

Beware that variables that are not declared with the `var` keyword are
implicitly global! In the following example, the variable `a` is available outside the function because it wasn't declared with the `var` keyword -- this is generally undesirable.

    function test() {
      a = 1;
    }

    test();

    print( a ); // prints 1


### Objects

As it turns out, most everything we work with in JavaScript is an object -- in fact, there are only five kinds of values that are *not* objects:

- strings
- booleans (true/false)
- numbers
- `undefined`
- `null`

These values are called "primitives," but even some of these values can be treated as though they were objects -- more on that in a minute. But what's an object? Let's look at an example of a simple object:

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender'
    };

The object we've created here has two *properties*: `firstName` and `lastName`. We've created it using the "object literal syntax" -- that is, by putting a set of key-value pairs in `{ }`. Note that, for each pair, there is a colon between the key and the value, and there is a comma between each pair. Note also that there is *not* a comma after the last key-value pair -- if you accidentally include a comma after the last pair, you will get errors in older browsers.

#### Accessing properties

We've stored our object in a variable named `person`, which makes it easy to access its properties, using either *dot notation* or *bracket notation*.

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender'
    };

    print( 'First name: ' + person.firstName );     // dot notation
    print( 'Last name: ' + person[ 'lastName' ] );  // bracket notation

You'll notice that with bracket notation, we used a quoted string for the property name we were after; with dot notation, we just used the literal property name, without quotes. Bracket notation is a useful approach if, say, the name of the property you're after is stored in a variable:

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender'
    };

    var prop = 'lastName';

    print( 'Last name: ' + person[ prop ] );

Once we've created an object, we can modify its properties.

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender'
    };

    person.firstName = 'Ben';
    person.lastName = 'Alman';

    print( 'First name: ' + person.firstName );
    print( 'Last name: ' + person.lastName );

This aspect of JavaScript -- which will change in a future version of the language -- is both blessing and curse. It means that objects are incredibly flexible, but it also means that there's no "privacy." Any code can easily overwrite the value of a property of any object to which it has access -- another reason why it's important to keep variables out of the global scope unless it's OK for other code to modify them.

#### Object methods

*Methods* of an object are just properties whose values are functions. Let's add a `.greet()` method to our `person` object:

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender',
      greet : function(name) {
        print( 'Hi, ' + name );
      }
    };

    person.greet( person.firstName );

The `.greet()` method in the example above received a string, `name`, as its argument. When we called the method, though, we simply passed in the value of the `firstName` property of the `person` object. If we wanted a super-flexible `.greet()` method that could greet anyone, this might be what we want. But it probably makes more sense that the `.greet()` method will greet the particular person.

#### The meaning of `this`

Inside of a method -- indeed, inside of any function -- there is a special keyword available to us: `this`. It refers to the object that is the context in which the function was called.

When we call `person.greet()`, the context object is `person` itself. This means that we can use `this` to access a property of the `person` object from directly within the `.greet()` method.

<div class="alert alert-info">
The meaning of `this` can be incredibly perplexing to new JavaScript developers, and you should take comfort in knowing that jQuery largely makes it so that you don't need to understand it for a while. However, no discussion of objects and methods is complete without talking about `this` at least a little.
</div>

Let's look at how we could use `this` in our method.

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender',
      greet : function() {
        print( 'Hi, ' + this.firstName );
      }
    };

    person.greet();

Not so confusing so far, right? The confusion arises because *the meaning of `this` can change* -- as mentioned above, it depends on the context in which the function was called! Consider the following code:

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender',
      greet : function() {
        print( 'Hi, ' + this.firstName );
      }
    };

    var sayIt = person.greet; // store the method in a variable

    sayIt(); // prints 'Hi, undefined' -- uh-oh

When we store the `.greet()` method in a variable `sayIt` and then call `sayIt()`, the context object changes to the global `window` object, *not the `person` object*. Since the `window` object doesn't have a property `firstName`, we get `undefined` when we try to access it.

What's a developer to do? First, be aware that storing object methods in variables can have unintended consequences for the meaning of `this`. Second, be aware that you can force the meaning of `this` to be what you want it to be, using the `.call()` method on the function itself.

    var person = {
      firstName : 'Boaz',
      lastName : 'Sender',
      greet : function() {
        print( 'Hi, ' + this.firstName );
      }
    };

    var sayIt = person.greet;
    sayIt.call( person ); // prints 'Hi, Boaz' -- hooray!

<div class="alert alert-info">
  What's the difference between `.call()` and `.apply()`? They both let us change the meaning of `this` inside of a function, but in the case of `.call()`, we pass arguments to the function as a list, and in the case of `.apply()` we pass arguments to the function as an array. For more details, see the MDN documentation on [`.call()`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call) and [`.apply()`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/apply).
</div>

#### Objects in jQuery

We've barely scratched the surface of objects, but you now know the basics you'll need to know to work with objects as you learn jQuery. In basic jQuery, you'll mainly use objects to provide configuration options. For example, you can provide an object to change several CSS properties on an element at once:

    $('#main').css({
      color: 'red',
      border: '1px solid blue'
    });

As far as `this`, jQuery tends to take control over its meaning. In the case of [event handlers](/chapter/events), `this` will refer to the element to which you bound the handler; in the case of [iterating over a set of elements in a selection](/chapter/jquery-basics#explicit-iteration), `this` will refer to the current element in the iteration. You shouldn't need to worry about understanding `this` too much during your initial learning -- it's just a good thing to keep in mind as your learning continues.

#### Further reading

The [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Working_with_Objects) goes into detail about topics such as object prototypes, constructor functions, and deleting object properties.


### Arrays

Arrays are a type of object used to store lists of values. They are a handy way to store a set of related items of the same type (such as strings), though in reality, an array can include multiple types of items, including other arrays.

The preferred way to create an array is to use the *array literal notation*:

    var myArray = [ 'a', 'b', 'c' ];

You will sometimes see code that creates an array using the `new Array('a', 'b', 'c')` construct. This is generally frowned upon among JavaScript developers; it provides no advantages over the literal construct, and has some disadvantages, such as the fact that `new Array(3)` will create an array with three undefined elements, rather than the array `[ 3 ]`.

We can access a value in an array by its index. The first item in an array has an index of `0`, the second has an index of `1`, etc. We access an item by index using bracket notation:

    var myArray = [ 'a', 'b', 'c' ];
    var item = myArray[ 1 ]; // access the item at index 1
    print( item ); // prints 'b'

We can determine how many items are in an array by accessing an array's `length` property:

    var myArray = [ 'a', 'b', 'c' ];
    var len = myArray.length;
    print( len ); // prints 3

Since we know how to get the length of an array, and we know that an array's first item is at index `0`, we can iterate over the items in an array using a `for` loop:

    var myArray = [ 'a', 'b', 'c' ];
    var i;
    var len = myArray.length;

    // we'll use the variable i as our index; it starts at 0,
    // and we increment it by 1 (using i++) until i is no longer
    // less than the length of the array
    for (i = 0; i < len; i++) {
      print( 'item at index ' + i + ' is ' + myArray[ i ] );
    }

There is a whole lot more that you can do with arrays; for a complete reference, see the [Mozilla Developer Network's Array documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/).


## JavaScript gotchas

In addition to variable scope, there are many other gotchas in JavaScript.
Let's take a look at a few of them.

### Naming things

<a name="naming-things"></a>

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

<a name="reserved-words"></a>

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

    print( 0.0001 + 0.0002 ); // 0.00030000000000000003

JavaScript is a loosely-typed language. If you try to do mathematical
operations using values that are not numbers, *JavaScript will not throw
errors*, and the result may not be what you'd expect.

    print( 'a' + 2 );           // 'a2'
    print( '4' + 3 );           // '43'
    print( 'five' - '4' );      // NaN (not a number)
    print( - '1' );             // -1
    print( 1 + true );          // 2
    print( 1 == true );         // true
    print( 1 === true );        // false

### Logic and Truthiness

<a href="logic-and-truthiness"></a>

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
- [Immediately Invoked Function Expressions](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
- [Arrays](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/)

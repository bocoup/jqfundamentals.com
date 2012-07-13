title: JavaScript Basics
previous:
  name: Home
  path: /
next:
  name: jQuery Basics
  path: /chapter/jquery-basics
links:
  - name: 'MDN: JavaScript'
    path: https://developer.mozilla.org/en/JavaScript
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

    greet('Jory', 'Welcome to JavaScript');
    greet('Rebecca', 'Thanks for joining us');

You can try running this program by copying it to the editor at the top of the
page and clicking the <i class="icon-play"></i> icon. You can also just click
the <i class="icon-eye-open"></i> and it will copy it automatically.

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
      document.body.appendChild(p);
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

### Operations on numbers and strings

### Truthiness

### Reserved words

### Semicolons


## JavaScript data structures

## Further reading

We've only scratched the surface of JavaScript. The Mozilla Developer Network
is an excellent resource for information about the JavaScript language,
particularly their [JavaScript
Guide](https://developer.mozilla.org/en/JavaScript/Guide). Specifically, you'll
do well to read the following articles:

  - [JavaScript Overview](https://developer.mozilla.org/en/JavaScript/Guide/JavaScript_Overview)
  - [Values, variables, and literals](https://developer.mozilla.org/en/JavaScript/Guide/Values%2C_Variables%2C_and_Literals)
  - [Functions](https://developer.mozilla.org/en/JavaScript/Guide/Functions)

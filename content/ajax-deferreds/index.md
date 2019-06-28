title: AJAX & Deferreds
sandbox: /sandbox/ajax-deferreds
previous:
  name: Effects
  path: /chapter/effects
next: false
links:
  - name: Ajax Documentation
    path: http://api.jquery.com/category/ajax/
  - name: The jqXHR Object
    path: http://api.jquery.com/jQuery.ajax/#jqXHR
  - name: Deferreds in jQuery
    path: http://api.jquery.com/category/deferred-object/
---

## AJAX

AJAX &mdash; "asynchronous JavaScript and XML" &mdash; is a means of loading data from a
server without requiring a page reload. It uses a browser's built-in XMLHttpRequest (XHR) functionality to make a request to the server and then handle the data that the server returns.

jQuery provides the `$.ajax` method  &mdash; and several convenience methods  &mdash; to make it easier to work with XHRs across browsers.

### $.ajax

We can use the jQuery `$.ajax()` method in a couple of different ways: we can pass it a configuration object as its sole argument, or we can pass it a URL and an optional configuration object. Let's take a look at the first approach:

    // Create the "callback" functions that will be invoked when...

    // ... the AJAX request is successful
    var updatePage = function( resp ) {
      $( '#target').html( resp.people[0].name );
    };

    // ... the AJAX request fails
    var printError = function( req, status, err ) {
      console.log( 'something went wrong', status, err );
    };

    // Create an object to describe the AJAX request
    var ajaxOptions = {
      url: '/data/people.json',
      dataType: 'json',
      success: updatePage,
      error: printError
    };

    // Initiate the request!
    $.ajax(ajaxOptions);

Of course, you can be less verbose by just passing an object literal to the `$.ajax()` method, and using anonymous functions for the `success` and `error` callbacks. This version is easier to write, and likely easier to maintain:

    $.ajax({
      url: '/data/people.json',
      dataType: 'json',
      success: function( resp ) {
        $( '#target').html( resp.people[0].name );
      },
      error: function( req, status, err ) {
        console.log( 'something went wrong', status, err );
      }
    });

As mentioned earlier, you can also call the `$.ajax()` method by passing it a URL and an optional configuration object. This can be useful if you want to use the default configuration for `$.ajax()`, or if you want to use the same configuration for several URLs.

    $.ajax( '/data/people.json', {
      type: 'GET',
      dataType: 'json',
      success: function( resp ) {
        console.log( resp.people );
      },
      error: function( req, status, err ) {
        console.log( 'something went wrong', status, err );
      }
    });

In this version, only the URL is required, but the configuration object lets
us tell jQuery what data we want to send, which HTTP method to use (GET, POST,
etc.), what kind of data we expect to receive, how to react when the
request succeeds or fails, and much more.

[See the `$.ajax()` documentation](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings) for a complete list of configuration options.

### A is for asynchronous

AJAX requests run *asynchronously*  &mdash; that means that the `$.ajax` method
returns before the request is finished, and therefore before the `success`
callback runs. That means that this function's `return` statement runs before
the request is complete. This means the `getSomeData` function below will return `data` before it is defined, causing the code to throw an error.

    ```<span class="caution">caution</span> broken code
    var getSomeData = function() {
      var data;

      $.ajax({
        url: '/data/people.json',
        dataType: 'json',
        success: function(resp) {
          data = resp.people;
        }
      });

      return data;
    }

    $( '#target' ).html( getSomeData().people[0].name );

### X is for JSON

The term AJAX was [coined in 2005](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications) to describe a method for retrieving data from a server without requiring a page refresh. Back then, data sent by a server tended to be formatted as [XML](http://en.wikipedia.org/wiki/XML), but these days, most modern applications use [JSON](http://www.json.org/) as the format for data from the server.

JSON is a string representation of data; it looks a whole lot like a normal JavaScript object, but it can only be used to represent a subset of the data that a normal JavaScript object can represent. For example, JSON cannot represent function or date objects. Here's an example of a JSON string; note how all property names are quoted:

    { "people" : [
      {
        "name" : "Ben",
        "url" : "http://benalman.com/",
        "bio" : "I create groovy websites, useful jQuery plugins, and play a mean funk bass. I'm also Director of Pluginization at @bocoup."
      },
      {
        "name" : "Rebecca",
        "url" : "http://rmurphey.com",
        "bio" : "Senior JS dev at Bocoup"
      },
      {
        "name" : "Jory",
        "url" : "http://joryburson.com",
        "bio" : "super-enthusiastic about open web education @bocoup. lover of media, art, and fake mustaches."
      }
    ] }

It's important to remember that *JSON is a string representation of an object*  &mdash; the string must be parsed into an actual JavaScript object before working with it. When you're working with a JSON response to an XHR, jQuery takes care of this task for you, but it's crucial to understand the difference between the JSON representation of an object, and the object itself.

<div class="alert alert-info">

If you need to create a JSON string from a JavaScript object, or if you need to parse a JSON string outside of jQuery, modern browsers provide the `JSON.stringify()` and `JSON.parse()` methods. This functionality can be added to older browsers using the [json2.js](https://github.com/douglascrockford/JSON-js) library. jQuery also provides the `jQuery.parseJSON` method, which provides the same functionality as `JSON.parse()` across all browsers. However, jQuery does not provide a method that corresponds to `JSON.stringify()`.

</div>

### Convenience methods

If we're just making a simple request  &mdash; and if we don't care about error
handling  &mdash; jQuery provides several "convenience methods" that let us use an
abbreviated syntax. Each of these methods takes a URL, an optional data object,
and an optional callback for handling a successful request.

    $.get( '/data/people.html', function( html ){
      $( '#target' ).html( html );
    });

    $.post( '/data/save', { name: 'Rebecca' }, function( resp ) {
      console.log( resp );
    });

### Sending data & working with forms

We can send data with our request by setting the `data` property on our
configuration object, or by passing an object as the second argument to one of
the convenience methods.

For a GET request, this data will be appended to the URL as a query string;
for a POST request, it will be sent as form data. jQuery provides the helpful `.serialize()` method for taking form input and converting it to a query string format (`field1name=field1value&field2name=field2value...`):

    $( 'form' ).submit(function( event ) {
      event.preventDefault();

      var form = $( this );

      $.ajax({
        type: 'POST',
        url: '/data/save',
        data: form.serialize(),
        dataType: 'json',
        success: function( resp ) {
          console.log( resp );
        }
      });
    });

### jqXHR

`$.ajax()` (and related convenience methods) returns a jqXHR object  &mdash; a *jQuery XML HTTP Request*  &mdash; which has a host of powerful methods. We can make a request using `$.ajax()`, and then capture the returned jqXHR object in a variable.

    var req = $.ajax({
      url: '/data/people.json',
      dataType: 'json'
    });

We can use this object to attach callbacks to the request, even after the request has completed. For example, we can use the `.then()` method of the jqXHR object to attach success and error callbacks. The `.then()` method takes one or two functions as its arguments. The first function will be be called if the request succeeds; the second will be called if the request fails.

    var success = function( resp ) {
      $( '#target' ).append(
        '<p>people: ' + resp.people.length + '</p>'
      );
      console.log( resp.people );
    };

    var err = function( req, status, err ) {
      $( '#target' ).append( '<p>something went wrong</p>' );
    };

    req.then( success, err );
    req.then(function() {
      $( '#target' ).append( '<p>it worked</p>' );
    });

We can call `.then()` on a request as many times as we'd like; it's a first-in, first-out queue.

If we don't want to attach success and error callbacks at the same time, we can
use the `.done()` and `.fail()` methods of the request object.

    req.done( success );
    req.fail( err );

If we want to attach a callback that runs on success or failure, we can use the
`.always()` method of the request object.

    req.always(function() {
      $( '#target' )
        .append( '<p>one way or another, it is done now</p>' );
    });

### JSONP

Many JavaScript developers are alarmed when they first try to use `$.ajax` to fetch data from another domain and their request fails. For example, you may try fetching data from a third-party API, and discover that your request consistently fails.

As it turns out, for security reasons, XHRs to other domains are blocked by the browser. However, certain third-party APIs provide a response formatted as JSONP  &mdash; "JSON with Padding"  &mdash; which allows you to use their data even though it is hosted on another server.

JSONP isn't exactly AJAX  &mdash; rather than using the browser's XHR functionality, it actually works by inserting a script tag into the page that contains the requested data, "padded" with a function wrapper. Nevertheless, jQuery lets you make a JSONP request with `$.ajax()` by specifying `'jsonp'` as the `dataType` in the configuration object.

    $.ajax({
      url: '/data/search.jsonp',
      data: { q: 'a' },
      dataType: 'jsonp',
      success: function( resp ) {
        $( '#target' ).html( 'Results: ' + resp.results.length );
      }
    });

<div class="alert alert-info">

An API that offers JSONP will specify the name of the callback parameter to use
in the query string; generally, this name is `callback`, and so jQuery uses
that as its default. However, you can override this callback name by specifying
the `jsonp` property in the configuration object passed to `$.ajax()`.

</div>

You can also use the `$.getJSON()` convenience method to make a JSONP request;
if the URL includes `callback=?` or similar, then jQuery will treat it as a
JSONP request.

    $.getJSON( '/data/search.jsonp?q=a&callback=?',
      function( resp ) {
        $( '#target' ).html( 'Results: ' + resp.results.length );
      }
    );

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)  &mdash; cross-origin resource sharing  &mdash; is another option for enabling cross-origin requests. However, it is not supported on older browsers, and it requires server-side configuration and manipulation of the XHR headers in order to work.

## Deferreds

The jqXHR object is simply a special flavor of a "deferred". jQuery lets you
create your own deferreds, which can be a powerful way for managing
asynchronous code. Deferreds provide a means to react to the eventual success
or failure of an asynchronous operation, and reduce the need for deeply nested
callbacks.

### $.Deferred

You can create your own deferreds using `$.Deferred()`. Here, we run a function
in a setTimeout, and "resolve" our deferred with the return value of that
function. We return the deferred's "promise"  &mdash; an object to which we can
attach callbacks, but which doesn't have the ability to modify the outcome of
deferred itself. We "reject" the deferred if anything goes wrong with running
the provided function.

    function doSomethingLater( fn, time ) {
      var dfd = $.Deferred();

      setTimeout(function() {
        dfd.resolve( fn() );
      }, time || 0);

      return dfd.promise();
    }

    var promise = doSomethingLater(function() {
      console.log( 'This function will be called in 100ms' );
    }, 100);

### .then(), .done(), .fail(), .always()

Just like with a jqXHR, we can attach success and error handlers to a promise.

    function doSomethingLater( fn, time ) {
      var dfd = $.Deferred();

      setTimeout(function() {
        dfd.resolve( fn() );
      }, time || 0);

      return dfd.promise();
    }

    var success = function( resp ) {
      $( '#target' ).html( 'it worked' );
    };

    var err = function( req, status, err ) {
      $( '#target' ).html( 'it failed' );
    };

    var dfd = doSomethingLater(function() { /* ... */ }, 100);

    dfd.then( success, err );

### pipe()

We can use the `.pipe()` method of a promise to react to the resolution of an
asynchronous operation by manipulating the value it returns and creating a new
deferred.

As of jQuery 1.8, the `.then()` method of a promise behaves like `.pipe()`.

    function doSomethingLater( fn, time ) {
      var dfd = $.Deferred();

      setTimeout(function() {
        dfd.resolve( fn() );
      }, time || 0);

      return dfd.promise();
    }

    var dfd = doSomethingLater(function() { return 1; }, 100);

    dfd
      .pipe(function(resp) { return resp + ' ' + resp; })
      .done(function(upperCaseResp) {
        $( '#target' ).html( upperCaseResp );
      });

### Reacting to maybe-asynchronous operations

Sometimes we have an operation that might return immediately, or
might be asynchronous  &mdash; for example, if a function does something
async the first time it runs, and then caches the value for future
use. In this case, we can use `$.when()` to react to either case.

    function maybeAsync( num ) {
      var dfd = $.Deferred();

      // return a deferred when num === 1
      if ( num === 1 ) {
        setTimeout(function() {
          dfd.resolve( num );
        }, 100);
        return dfd.promise();
      }

      // return immediately otherwise
      return num;
    }

    // this will resolve async
    $.when( maybeAsync( 1 ) ).then(function( resp ) {
      $( '#target' ).append( '<p>' + resp + '</p>' );
    });

    // this will return immediately
    $.when( maybeAsync( 0 ) ).then(function( resp ) {
      $( '#target' ).append( '<p>' + resp + '</p>' );
    });

You can also pass `$.when()` more than one argument, which lets you mix sync
and async operations; you get their return values back as arguments to the
callback.

    function maybeAsync( num ) {
      var dfd = $.Deferred();

      // return a deferred when num === 1
      if ( num === 1 ) {
        setTimeout(function() {
          dfd.resolve( num );
        }, 100);
        return dfd.promise();
      }

      // return immediately otherwise
      return num;
    }

    $.when( maybeAsync( 0 ), maybeAsync( 1 ) )
      .then(function( resp1, resp2 ) {
        var target = $( '#target' );
        target.append( '<p>' + resp1 + '</p>' );
        target.append( '<p>' + resp2 + '</p>' );
      });

When a jqXHR is one of the arguments to `$.when()`, we get an array of
arguments passed to our callback.

    function maybeAsync( num ) {
      var dfd = $.Deferred();

      // return a deferred when num === 1
      if ( num === 1 ) {
        setTimeout(function() {
          dfd.resolve( num );
        }, 100);
        return dfd.promise();
      }

      // return immediately otherwise
      return num;
    }

    $.when( maybeAsync( 0 ), $.get( '/data/people.json' ) )
      .then(function( resp1, resp2 ) {
        console.log( "Both operations are done", resp1, resp2 );
      });

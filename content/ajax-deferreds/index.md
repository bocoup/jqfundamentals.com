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

AJAX -- "asynchronous JavaScript and XML" -- is a means of loading data from a
server without requiring a page reload. These days, most "AJAX" doesn't use XML
at all -- it usually uses HTML or JSON instead.  jQuery provides the `$.ajax`
method -- and several convenience methods -- to make it easier to work with
asynchronous requests for data across browsers.

### A is for asynchronous

AJAX requests run *asynchronously* -- that means that the `$.ajax` method
returns before the request is finished, and therefore before the `success`
callback runs. That means that this function's `return` statement runs before
the request is complete, causing the function to return `undefined`.

    function getSomeData() {
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

### $.ajax

jQuery's `$.ajax()` method has a couple of different signatures. We can provide a
configuration object ...

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

... or we can provide a URL and a configuration object

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

Strictly speaking, only the URL is required, but the configuration object lets
us tell jQuery what data we want to send, which HTTP method to use (GET, POST,
etc.), what kind of data we expect to receive, and how to react when the
request succeeds or fails.

### Convenience methods

If we're just making a simple request -- and if we don't care about error
handling -- jQuery provides several "convenience methods" that let us use an
abbreviated syntax. Each of these methods takes a URL, an optional data object,
and an optional callback for handling a successful request.

    $.get( '/data/people.html', function( html ){
      $( '#target' ).html( html );
    });

    $.post( '/data/save', { name: 'Rebecca' }, function( resp ) {
      console.log( JSON.parse( resp ) );
    });

### Sending data & working with forms

We can send data with our request by setting the `data` property on our
configuration object, or by passing an object as the second argument to one of
the convenience methods.

For a GET request, this data will be appended to the URL as a query string;
for a POST request, it will be sent as form data.

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

### JSONP

Cross-domain XHRs won't work, but certain third-party APIs provide a JSONP --
"JSON with Padding" -- response that allows you to use their data even though
it is hosted on another server. JSONP isn't AJAX -- it actually works by
inserting a script tag into the page that contains the requested data, "padded"
with a function wrapper.

Even though this isn't actually AJAX, jQuery lets you make a JSONP request with
`$.ajax()` by specifying `'jsonp'` as the `dataType` in the configuration object.

    $.ajax({
      url: 'http://search.twitter.com/search.json',
      data: { q: 'kittens' },
      dataType: 'jsonp',
      success: function( resp ) {
        $( '#target' ).html( 'Results: ' + resp.results.length );
      }
    });

An API that offers JSONP will specify the name of the callback parameter to use
in the query string; generally, this name is `callback`, and so jQuery uses
that as its default. However, you can override this callback name by specifying
the `jsonp` property in the configuration object.

    $.ajax({
      url: 'http://search.twitter.com/search.json',
      data: { q: 'kittens' },
      dataType: 'jsonp',
      jsonp: 'cb'
    });

You can also use the `$.getJSON()` convenience method to make a JSONP request;
if the URL includes `callback=?` or similar, then jQuery will treat it as a
JSONP request.

    $.getJSON( 'http://search.twitter.com/search.json?q=kittens&callback=?',
      function( resp ) {
        $( '#target' ).html( 'Results: ' + resp.results.length );
      }
    );

### jqXHR

`$.ajax()` (and related convenience methods) returns a jqXHR object, which has
a host of powerful methods. We can make a request using `$.ajax()`, and then
capture the returned jqXHR object in a variable.

    var req = $.ajax({
      url: '/data/people.json',
      dataType: 'json'
    });

We can use this object to attach callbacks to the request, even after the
request has completed. For example, we can use the `.then()` method of the jqXHR
object to attach success and error callbacks. We can do this as many times as
we'd like; it's a first-in, first-out queue.

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

If we want to attach a callback that runs on success or failure, we can use the
`.always()` method of the request object.

    req.always(function() {
      $( '#target' )
        .append( '<p>one way or another, it is done now</p>' );
    });

If we don't want to attach success and error callbacks at the same time, we can
use the `.done()` and `.fail()` methods of the request object.

    req.done( success );
    req.fail( err );

## Deferreds

The jqXHR object is simply a special flavor of a "deferred". jQuery lets you
create your own deferreds, which can be a powerful way for managing
asynchronous code. Deferreds provide a means to react to the eventual success
or failure of an asynchronous operation, and reduce the need for deeply nested
callbacks.

### $.Deferred

You can create your own deferreds using `$.Deferred()`. Here, we run a function
in a setTimeout, and "resolve" our deferred with the return value of that
function. We return the deferred's "promise" -- an object to which we can
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

    var promise = doSomethingLater(function() { /* ... */ }, 100);

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

As of jQuery 1.8, the `.then()` method of a promise behaves like pipe.

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
      .done(function(newResp) { $('#target').html(newResp); });

### Reacting to maybe-asynchronous operations

Sometimes we have an operation that might return immediately, or
might be asynchronous -- for example, if a function does something
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
        debugger;
      });

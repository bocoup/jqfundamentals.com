title: Animating Your Pages with jQuery
sandbox: /sandbox/effects
previous:
  name: Events & Event Delegation
  path: /chapter/events
next:
  name: AJAX & Deferreds
  path: /chapter/ajax-deferreds
links:
  - name: Effects Documentation
    path: http://api.jquery.com/category/effects/
---

jQuery makes it trivial to add simple effects to your page. Effects can use the
built-in settings or provide a customized duration. You can also create custom
animations of arbitrary CSS properties.

See the [effects documentation](http://api.jquery.com/category/effects/) for
complete details on jQuery effects.

<div class="alert alert-info">
  **An important note about animations:** In modern browsers, and especially on mobile devices, it is often much more efficient to achieve animations using CSS rather than JavaScript. The details of doing this are beyond the scope of this guide, but if you are only targeting mobile devices or browsers that support CSS animations, then you should use CSS for animations where possible. You may also want to consider setting `jQuery.fx.off` to true on low-resource devices; doing so will cause animation methods to immediately set elements to the desired state, rather than animating to that state.
</div>

## Built-in effects

Frequently used effects are built into jQuery as methods that you can call on
any jQuery object:

- **`.show()`** Show the selected elements.
- **`.hide()`** Hide the selected elements.
- **`.fadeIn()`** Animate the opacity of the selected elements to 100%.
- **`.fadeOut()`** Animate the opacity of the selected elements to 0%.
- **`.slideDown()`** Display the selected elements with a vertical sliding
  motion.
- **`.slideUp()`** Hide the selected elements with a vertical sliding motion.
- **`.slideToggle()`** Show or hide the selected elements with a vertical
  sliding motion, depending on whether the elements are currently visible.

Once you've made a selection, it's simple to apply an effect to that selection.

    $( '.hidden' ).show();

You can also specify the duration of built-in effects. There are two ways to do
this: you can specify a time in milliseconds ...

    $( '.hidden' ).show( 300 );

... or use one of the pre-defined speeds:

    $( '.hidden' ).show( 'slow' );

The predefined speeds are specified in the `jQuery.fx.speeds` object; you can
modify this object to override the defaults, or extend it with new names:

    // re-set an existing predefined speed
    jQuery.fx.speeds.fast = 50;

    // create a new pre-defined speed
    jQuery.fx.speeds.turtle = 3000;

    // Since we've re-set the 'fast' speed, this will now animate over the
    // course of 50 milliseconds
    $( '.hidden' ).hide( 'fast' );

    // After they are created, we can use custom speeds just as we use the
    // built-in speeds
    $( '.other-hidden' ).show( 'turtle' );

Often, you'll want to do something once an animation is done &mdash; if you try to do it before the animation completes, it may affect the quality of the animation, or it may remove elements that are part of the animation. You can provide a callback function to the animation methods if you want to specify what should happen when the effect is complete. Inside the callback, `this` refers to the raw DOM element that the effect was applied to. Just like with event callbacks, we can turn it into a jQuery object by passing it to the `$()` function: `$( this )`.

    $( 'p.old' ).fadeOut( 300, function() {
      $( this ).remove();
    });

Note that if your selection doesn't contain any elements, then your callback
will never run! If you need your callback to run regardless of whether there
are elements in your selection, you can create a function and use it for both cases:

    var oldElements = $( 'p.old' );
    var thingToAnimate = $( '#nonexistent' );

    // This function will be a "callback" to the "show" method when there are
    // elements to show. Otherwise, we will simply call it immediately
    var removeOldElements = function() {
      oldElements.remove();
    };

    if ( thingToAnimate.length ) {

      // When passed as a callback to "show", the function will be invoked
      // when the animation is complete
      thingToAnimate.show( 'slow', removeOldElements );

    } else {
      removeOldElements();
    }

## Custom effects with .animate()

If the built-in animations don't suit your needs, you can use `.animate()` to
create custom animations of many CSS properties. (Notably, you cannot animate the color property, but there is a
[plugin](https://github.com/jquery/jquery-color/) that makes it possible).

The `.animate()` method takes up to three arguments:

- an object defining the properties to be animated
- the duration of the animation, in milliseconds
- a callback function that will be called when the animation is complete

The `.animate()` method can animate to a specified final value, or it can
increment an existing value.

    $( '.funtimes' ).animate({
        left: '+=50', // increase by 50
        opacity: 0.25,
        fontSize: '12px'
      },
      300,
      function() {
        // executes when the animation is done
      }
    );

<div class="alert alert-info">Note that if you want to animate a CSS property whose name includes a hyphen, you will need to use a "[camel case](http://en.wikipedia.org/wiki/CamelCase)" version of the property name if you do not quote the property name. For example, the `font-size` property must be referred to as `fontSize`.</div>

## Managing animations

jQuery provides two important methods for managing animations.

- `.stop()` will stop currently running animations on the selected elements.
- `.delay()` will pause before the execution of the next animation method. Pass
  it the number of milliseconds you want to wait.

jQuery also provides methods for managing the effects queue, creating custom
queues, and adding custom functions to these queues. These methods are beyond
the scope of this guide, but [you can read about them
here](http://api.jquery.com/category/effects/).

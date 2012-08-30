Farmetha's jQuery Plugins
==============
This project is a work in progress.  It is a set of jQuery 
plugins to add simple functionality to a webpage.  It
contains the following plugins:

* __StickyNode__ _(lib/jquery.stickynode.js)_ - A simple
implementation of a sticky menu, which allows page 
elements to stick or float in a fixed position once the
window scrolls below their top position.  An example can
be found in demo/stickynode.html.

Usage Documentation
--------------------
### StickyNode
The javascript source for the stickynode plugin is in 
lib/jquery.stickynode.js.  Usage is currently very simple
and only has one option _offsetY_.

#### Usage


    (function($) {
      //with no options
      $('.someclass').stickynode();
      
      //with options
      $('.anotherclass').stickynode({
        offsetY: 100
      }):
    })(jQuery);


#### Options
 * offsetY - The distance from the top of the window that 
the element will float once it becomes sticky.
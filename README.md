pleaseWait
----------

Load animations with modern CSS.

# Rules

More spinner are very welcome, but there are some rules, to get a successfull merge.

1. Use only HTML and CSS, no JavaScript, no Canvas, no SVG, no GIF, no Flash ... especially no(!) Flash.
2. Write your CSS in Stylus, not pure CSS, SASS, LESS, whatever.
3. The loader have to work in modern major web browsers. It's ok, if a loader only works in a browser version, that is only one day old, but please document this. It's a plus, if the loader also works in older browsers, but it's not necessary. Major browsers are Chrome, Firefox, IE, Safari and Opera.
4. No rule without an exception. If the loader is cool enough, it's absolutely ok, if it's only works in Chrome ;).
5. For the default skin, use the default colors of the pleaseWait-Page.
6. Do not use `opacity`, `rgba` is the better way.
7. The max size of a spinner should be 30x30px
8. Oh, and did I say that: NO FLASH!

# How to contribute

* Please fork the actual project
* create a folder for your new spinner inside of the spinner directory
* make sure, that your new folder includes an info.json, a html file and a stylus file
* for development you can use ```grunt watch``` which generate always a new build including your new spinner at ```dist/index.html```
* if you're done, make sure you followed the rules and add / commit your new spinner folder
* make pull request
 

Example folder structure:
  ```
  spinner | yourNewSpinner | - info.json
                           | - yourNewSpinner.html
                           | - yourNewSpinner.styl
  ```

# Upcoming Features

* Upgrading to Styl
* Showing CSS and HTML directly on the page
* Editable CSS and HTML on the page for experiencing
* UI elements to configure the spinner/loader animations

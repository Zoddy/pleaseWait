'use strict';

;(function($) {
  var spinnerList = $('#toc > li'),
      info = $('#loaderInfo'),
      spinnerName = $('h3'),
      spinnerAuthor = info.find('a'),
      githubUrl = 'https://github.com/';

  spinnerList.mouseenter(function(event) {
    var spinner = $(event.currentTarget),
        link = githubUrl + spinner.data('github'),
        author = spinner.data('author'),
        position = spinner.offset();

    // set informations
    spinnerName.text(spinner.data('name'));
    spinnerAuthor.attr('href', link).text(author);

    // higher z-index
    spinner.css('z-index', 2);

    // show info
    info.css({
      'left': (
        position.left +
        spinner.outerWidth() / 2 -
        info.outerWidth() / 2) +
        'px',
      'top': (
        position.top +
        spinner.outerHeight() / 2 -
        info.outerHeight() / 2) +
        'px',
      'visibility': 'visible'
    });
  });

  info.mouseleave(function() {
    // default z-index
    spinnerList.css('z-index', 'auto');

    // hide info
    info.css('visibility', 'hidden');
  });
})($);

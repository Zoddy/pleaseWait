'use strict';

var pw = {
  loader: {},
  _loader: {},
  _githubUri: 'https://github.com/',
  _info: null,

  init: function() {
    this._loader = $('#toc > li');
    this._loader.addClass('pause');
    this._loader.on('mouseenter', this._showInfo.bind(this));
    this._loader.on('click', this._toggleCodeSnippets.bind(this));

    this._info = $('#loaderInfo');
    this._info.on('mouseleave', this._hideInfo.bind(this));
    this._info.on(
      'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      this._positionInfo.bind(this)
    );

    this._infoHtml = this._info.find('#loaderInfoHtml');
    this._infoCss = this._info.find('#loaderInfoCss');
  },

  _hideInfo: function() {
    var css = this._infoCss,
        html = this._infoHtml,
        info = this._info,
        loader = this._currentLoader;

    if (loader.hasClass('play')) {
      loader.toggleClass('play pause');

      info.hide();

      css.addClass('hidden');
      html.addClass('hidden');
    }
  },

  _positionInfo: function() {
    var loader = this._currentLoader,
        loaderPos = loader.offset(),
        info = this._info;

    info.css({
      'left': (
        loaderPos.left -
        info.outerWidth() / 2 +
        loader.outerWidth() / 2
      ).toFixed(0) + 'px',
      'top': (loaderPos.top - info.height() / 2 + loader.height() / 2) + 'px'
    });
  },

  _toggleCodeSnippets: function(event) {
    var css = this._infoCss,
        html = this._infoHtml,
        info = this._info;

    css.toggleClass('hidden');
    html.toggleClass('hidden');

    //this._positionInfo();
  },

  _showInfo: function(event) {
    var loader = $(event.currentTarget),
        info = this._info;

    this._currentLoader = loader;

    if (!loader.hasClass('play')) {
      loader.toggleClass('play pause');

      info.show();
      info.find('h3').text(loader.data('name'));
      info.find('a')
        .attr('href', this._githubUri + loader.data('github'))
        .text(loader.data('author'));

      this._positionInfo();
    }
  }
};

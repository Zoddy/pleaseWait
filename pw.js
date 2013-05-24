'use strict';

var pw = {
  loader: {},
  _loader: {},
  _githubUri: 'https://github.com/',
  _info: null,

  init: function() {
    this._loader = $('#toc > li');
    this._loader.addClass('pause');
    this._loader.hover(this._toggleAnimation.bind(this));
    this._loader.click(this._showSettings.bind(this));

    this._info = $('#loader_info');
  },

  _createSlider: function(name, content) {

  },

  _hideInfo: function() {
    if (!this._info.hasClass('settings')) {
      this._info.hide();
    }
  },

  _showSettings: function(event) {
    var loader = $(event.currentTarget).find('> div').attr('id');

    Object.keys(loader.properties).forEach(function(property) {
      this._createSlider(property, loader.properties[property]);
    }, this);

    this._info.toggleClass('settings');
  },

  _toggleAnimation: function(event) {
    var loader = $(event.currentTarget),
        loaderPos = loader.offset(),
        info = this._info;

    loader.toggleClass('play pause');

    if (loader.hasClass('play')) {
      info.show();
      info.find('h3').text(loader.data('name'));
      info.find('a')
        .attr('href', this._githubUri + loader.data('github'))
        .text(loader.data('author'));

      info.css({
        'left': (
          loaderPos.left -
          info.outerWidth() / 2 +
          loader.outerWidth() / 2
        ).toFixed(0) + 'px',
        'top': (loaderPos.top - info.height() / 2 + loader.height() / 2) + 'px'
      });
    } else {
      this._hideInfo();
    }
  }
};
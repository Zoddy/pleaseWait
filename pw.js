var pw = {
  _loader: {},

  init: function() {
    this._loader = $('#toc > li');
    this._loader.addClass('pause');
    this._loader.hover(this._toggleAnimation);
  },

  _toggleAnimation: function(event) {
    $(event.currentTarget).toggleClass('play pause');
  }
};
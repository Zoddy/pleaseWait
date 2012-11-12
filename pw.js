var pw = {
  _loader: {},

  init: function() {
    // adding play/pause buttons
    $('#toc > li').prepend('<div class="play"></div>');

    // getting loader
    this._loader = $('#toc > li > div > div');

    // adding function to play/pause-buttons
    $('#toc .play').click($.proxy(this._toggleAnimation, this));
  },

  _toggleAnimation: function(event) {
    var playButton = $(event.currentTarget),
        animationContainer = playButton.parent().find('> div > div');

    // switch between play and pause status
    playButton.toggleClass('play pause');

    // add or remove animation name, so the animation stops or starts
    if (playButton.hasClass('pause')) {
      animationContainer.css('-webkit-animation-play-state', 'running');
    } else if (playButton.hasClass('play')) {
      animationContainer.css('-webkit-animation-play-state', 'paused');
    }
  }
};
'use strict';

var fs = require('fs'),
    stylus = require('stylus');

var distDirectory = __dirname + '/dist',
    spinnerDirectory = __dirname + '/spinner',
    spinnerList = fs.readdirSync(spinnerDirectory).map(function(spinner) {
      var directory = spinnerDirectory + '/' + spinner + '/';

      return {
        info: require(directory + 'info.json'),
        html: fs.readFileSync(directory + spinner + '.html', 'utf8'),
        style: fs.readFileSync(directory + spinner + '.styl', 'utf8')
      };
    }),
    defaultStyle = fs.readFileSync(__dirname + '/default.styl', 'utf8'),
    style = [defaultStyle].concat(spinnerList.map(function(spinner) {
      return spinner.style;
    })).join('\n'),
    html = spinnerList.map(function(spinner) {
      var data = [
            'data-name="' + spinner.info.name + '"',
            'data-author="' + spinner.info.author + '"',
            'data-github="' + spinner.info.github + '"'
          ].join(' ');

      return '<li '+ data + '>' + spinner.html + '</li>';
    }).join('\n'),
    indexFile = fs.readFileSync(__dirname + '/index.html', 'utf8');

stylus.render(style, {compress: true}, function(error, css) {
  indexFile = indexFile.replace(
    /\{\{ SPINNER_STYLE \}\}/,
    css
  ).replace(
    /\{\{ SPINNER_HTML \}\}/,
    html
  ).replace(
    /\{\{ SPINNER_SCRIPT \}\}/,
    fs.readFileSync(__dirname + '/pw.js', 'utf8')
  );

  fs.unlinkSync(distDirectory + '/index.html');
  fs.rmdirSync(distDirectory);
  fs.mkdirSync(distDirectory);

  fs.writeFileSync(
    distDirectory + '/index.html',
    indexFile,
    {encoding: 'utf8', flag: 'w'}
  );
});

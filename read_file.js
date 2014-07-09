#!/opt/node/bin/node

var fs = require('fs');
var promise = require('q');

var read = promise.denodeify(require('fs').readFile)

read('./temp.txt', 'utf8')
.then(function (content) {
  console.log(content.split('=')[1].split("'")[0]);
})

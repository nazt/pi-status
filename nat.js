#!/opt/node/bin/node

var fs = require('fs');
var promise = require('q');

var read = promise.denodeify(require('fs').readFile)

read('./ram.txt', 'utf8')
.then(function (content) {
  var obj = JSON.parse(content);
  var ram = obj.ram
  ram.used = ram.total-ram.free 
  console.log(obj.ram);
//  ram.forEach(function(v, k) {
//    var tmp = v.split(":");
//    var type =  tmp[0];
//    var value =  tmp[1].trim();
//    console.log(type, value);
//  }); 
})
.fail(function() {
  console.log(arguments);
});

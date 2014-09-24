#!/opt/node/bin/node

var fs = require('fs');
var promise = require('q');

var read = promise.denodeify(require('fs').readFile)

read('./ram.txt', 'utf8')
.then(function (content) {
  var obj = JSON.parse(content);
  var ram = obj.ram
  var cpu_temp =  obj.temp
  ram.used = ram.total-ram.free 
  console.log(ram, cpu_temp);
})
.fail(function() {
  console.log(arguments);
});

#!/opt/node/bin/node

var fs = require('fs');
var promise = require('q'); 
var read = promise.denodeify(require('fs').readFile)


var XivelyClient = require('xively');
var x = new XivelyClient();
var FEED_ID = "2047342041";
x.setKey('YOGj6nNmTRiciDSg2ioX5iamkxtJyYWiGoTZ6nseSWdys5nM');

var dp = {
      "version":"1.0.0",
       "datastreams" : [ ]
}

read('/home/pi/pi-status/system.txt')
.then(function (content) {
  var obj = JSON.parse(content);
  var ram = obj.ram
  var cpu_temp =  obj.temp
  ram.used = ram.total-ram.free 

  dp.datastreams[0] = { "id": "ram_used", "current_value": ram.used/1024}; 
  dp.datastreams[1] = { "id": "ram_free", "current_value": ram.free/1024}; 
  dp.datastreams[2] = { "id": "ram_total", "current_value": ram.total/1024}; 
  dp.datastreams[3] = { "id": "cpu_temperature_raw", "current_value": cpu_temp }; 
})
.then(function() { 
  x.feed.new(FEED_ID, {
        data_point: dp,
        callback: function(e) { console.log(e); }
  }); 
})
.fail(function(e) {
  console.log(e);
});;


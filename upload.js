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
       "datastreams" : [
      {
          "id" : "cpu_temperature",
          "current_value" : undefined
      }
    ]
}

read('/home/pi/pi-status/temp.txt')
.then(function (content) {
  dp.datastreams[0].current_value = content.toString().split('=')[1].split("'")[0];
  console.log(dp);
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


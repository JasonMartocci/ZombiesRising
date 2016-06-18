// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set your region for future requests.
AWS.config.region = 'us-west-2';
AWS.config.accessKeyId = 'AKIAIECXXO6BFSUJONGQ';
AWS.config.secretAccessKey = 'gTTAPSwTYHgswfChCmNYz3vOE6EIm/fE7VKkLO7q';

// Create a bucket using bound parameters and put something in it.
// Make sure to change the bucket name from "myBucket" to something unique.
var s3bucket = new AWS.S3({params: {Bucket: 'zombiesrising'}});
s3bucket.createBucket(function() {
  var params = {Key: 'myKey', Body: 'Hello!'};
  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to zombiesrising/myKey");
    }
  });
});


var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});


var fs = require('fs');
var zlib = require('zlib');

// var body = fs.createReadStream('selenium-server-standalone-2.53.0.jar').pipe(zlib.createGzip());
// var s3obj = new AWS.S3({params: {Bucket: 'zombiesrising', Key: 'jarfile'}});
// s3obj.upload({Body: body}).
//   on('httpUploadProgress', function(evt) { console.log(evt); }).
//   send(function(err, data) { console.log(err, data) });
//
//

/**
 * Upload Controller
 */

var fs = require('fs'),
    path = require('path'),
    aws = require('aws-sdk');

var UploadController = {
  index: function (req, res) {
    var fileBuffer = fs.readFileSync(req.files.file.path);
    var metaData = req.files.file.headers['content-type'];

    // Config AWS
    aws.config.update({accessKeyId: sails.config.aws.accessKeyId, secretAccessKey: sails.config.aws.secretAccessKey});
    var s3 = new aws.S3({
      endpoint: sails.config.aws.endPoint
    });

    var params = {
      Bucket: sails.config.aws.bucket,
      ACL: 'public-read',
      Key: req.files.file.originalFilename,
      Body: fileBuffer
    };

    // Store image into aws bucket
    s3.putObject(params, function(err, data) {
      if (err) {
        res.serverError(err);
      } else {
        // Return link to the image
        res.send({
          url: 'https://' + sails.config.aws.endPoint + '/' + sails.config.aws.bucket + '/' + req.files.file.originalFilename
        });
      }
    });
  }
};
module.exports = UploadController;
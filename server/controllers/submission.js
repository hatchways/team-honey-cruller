const asyncHandler = require("express-async-handler");

const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

const s3 = new aws.S3({
	accessKeyId: process.env.S3_ACCESSKEYID,
	secretAccessKey: process.env.S3_ACCESSKEY,
	Bucket: process.env.S3_BUCKET
});


exports.submitPictures = asyncHandler(async (req, res) => {
  
})
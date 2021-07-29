const asyncHandler = require("express-async-handler");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const {
  deleteImage
} = require('../utils/deleteAws')

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_ACCESSKEY,
  Bucket: process.env.S3_BUCKET,
});

// only allowing jpeg,jpg,png,gif file types
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const uploadsContestGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
      );
    },
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("galleryImage");

exports.upload = asyncHandler(async (req, res) => {
  uploadsContestGallery(req, res, (error) => {
    if (error) {
      res.json({
        error: error
      });
    } else {
      if (req.files === undefined) {
        res.json("Error: No File Selected");
      } else {
        let fileArray = req.files,
          fileLocation;
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          galleryImgLocationArray.push(fileLocation);
        }
        res.json({
          locationArray: galleryImgLocationArray,
        });
      }
    }
  });
});

const AWSPic = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
      );
    },
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

exports.uploadProfilePic = asyncHandler(async (req, res, next) => {

  const user = await User.findOne({
    _id: req.user.id
  });


  if (user.profilePic) {
    deleteImage(user.profilePic)
  }

  AWSPic(req, res, async (error) => {
    if (error) {
      res.json({
        error: error
      });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected");
      } else {
        try {
          const {
            profilePic
          } = await User.findByIdAndUpdate(req.user.id, {
            $set: {
              profilePic: req.file.location
            }
          }, {
            new: true
          })
          res.json(profilePic);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    }
  })
})

exports.uploadSubmissionPic = asyncHandler(async (req, res, next) => {
  AWSPic(req, res, async (error) => {
    if (error) {
      res.json({
        error: error
      });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected");
      } else {
        try {
          res.json(req.file.location)
        } catch (err) {
          res.status(500).json(err);
        }
      }
    }
  })
});
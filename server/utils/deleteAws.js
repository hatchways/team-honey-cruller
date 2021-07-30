const asyncHandler = require("express-async-handler");

exports.deleteImage = asyncHandler(async (image) => {
    const [_ , Key] = image.split('https://team-honey.s3.amazonaws.com/')
    try {
        s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key
        }, function (err, data) {
            if (err) {
                return err;
            } else {
                return `Image has been deleted successfully - ${data}`
            }
        })
    } catch (err) {
        return err;
    }
})

exports.deleteImages = asyncHandler(async (imgArray) => {
    const keyArray = imgArray.map((key, i) => {
        const [_, splitKey] = key.split('https://team-honey.s3.amazonaws.com/');

        return {
            Key: splitKey
        }

    });
    const params = {
        Bucket: process.env.BUCKET,
        Delete: {
            Objects: keyArray,
            Quiet: false
        }
    };
    try {
        s3.deleteObjects(params, function (err, data) {
            if (err) {
                return err;
            } else {
                return `Submission Images have been deleted - ${data}`;
            }
        });
    } catch (err) {
        return err;
    }
})
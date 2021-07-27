const asyncHandler = require("express-async-handler");

exports.deleteImage = asyncHandler(async (Key) => {
    try {
        s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key
        }, function (err, data) {
            if (err) {
                throw err
            } else {
                console.log(data)
                console.log("File has been deleted successfully");
            }
        })
    } catch (err) {
        console.log(err)
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
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });
    } catch (err) {
        console.log(err)
    }
})
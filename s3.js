require('dotenv').config()
const fs = require('fs')

const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.S3_BUCKET
const region = process.env.AWS_REGION
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})


function uploadFile(file, filename) {
    
    const fileStream = fs.createReadStream(file)
    
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename,
    }

    return s3.upload(uploadParams).promise()
}

function getFile(fileKey) {

    const downloadParams = {
        Bucket: bucketName,
        Key: fileKey,
    }
    return s3.getObject(downloadParams, (err, data) => {
        if (err) console.error(err);
        fs.writeFileSync(__dirname + `/public/${fileKey}.png`, data.Body);
    })

}

function deleteFile(fileKey) {

    const downloadParams = {
        Bucket: bucketName,
        Key: fileKey,
    }
    return s3.deleteObject(downloadParams, (err) => {
        console.log(err)
    })

}

exports.uploadFile = uploadFile
exports.getFile = getFile
exports.deleteFile = deleteFile


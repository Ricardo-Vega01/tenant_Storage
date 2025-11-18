import aws from "aws-sdk";

export const s3 = new aws.S3({
    endpoint: process.env.MINIO_ENDPOINT,
    accessKeyId: process.env.MINIO_KEY_ID,
    secretAccessKey: process.env.MINIO_ACCESS_KEY,
    s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
    signatureVersion: process.env.MINIO_SIGNATURE_VERSION,
});

export const bucket = process.env.MINIO_BUCKET;
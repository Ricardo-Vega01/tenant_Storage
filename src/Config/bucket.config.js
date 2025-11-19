import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: "us-east-1", // o la que uses, MinIO no necesita región pero AWS SDK sí
    endpoint: process.env.MINIO_ENDPOINT,
    credentials: {
        accessKeyId: process.env.MINIO_KEY_ID,
        secretAccessKey: process.env.MINIO_ACCESS_KEY,
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true", // equivalente a s3ForcePathStyle
});

export const bucket = process.env.MINIO_BUCKET;

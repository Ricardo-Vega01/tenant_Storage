import { bucket, s3 } from "./minio.service";

export class StorageService {
    constructor() {
        this.bucket = bucket;
        this.client = s3;
    }

    async createTenantFolderService(slug) {
        return this.client.putObject({
            Bucket: this.bucket,
            Key: `${slug}/`,
            Body: "",
        }).promise();
    }

    async createFolderService(slug, folderId) {
        return this.client.putObject({
            Bucket: this.bucket,
            Key: `${slug}/${folderId}/`,
            Body: "",
        }).promise();
    }

    async uploadFileService(slug, folderId, fileName, fileBuffer, mimeType) {
        return this.client.putObject({
            Bucket: this.bucket,
            Key: `${slug}/${folderId}/${fileName}`,
            Body: fileBuffer,
            ContentType: mimeType,
        }).promise();
    }

    async listFilesService(slug, folderId) {
        return this.client.listObjectsV2({
            Bucket: this.bucket,
            Prefix: `${slug}/${folderId}/`,
            Delimiter: "/",
        }).promise();

        return {
            folders: result.CommonPrefixes.map((p) => p.Prefix) || [],
            files:
                result.Contents?.filter((c) =>
                    c.Key !== `${slug}/${folderId}/`
                ) || [],
        };
    }

    async getFileService(slug, folderId, fileName) {
        return this.client.getObject({
            Bucket: this.bucket,
            Key: `${slug}/${folderId}/${fileName}`,
        }).promise();
    }

    async getFileSignedUrl(slug, folderId, fileName, expiresIn = 350) {
        return this.client.getSignedUrl("getObject", {
            Bucket: this.bucket,
            Key: `${slug}/${folderId}/${fileName}`,
            Expires: expiresIn,
        });
    }

    async deleteFileService(slug, folderId, fileName) {
        return this.client.deleteObject({
            Bucket: this.bucket,
            Key: `${slug}/${folderId}/${fileName}`,
        }).promise();
    }
}

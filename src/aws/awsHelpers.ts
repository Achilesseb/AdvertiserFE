import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_KEY as string,
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

export const uploadVideoToS3 = async (objectKey: string, file: File) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    Body: file,
  });

  try {
    await s3.send(command);
  } catch (err) {
    console.error(err);
  }
};

export const getVideoUrlAws = async (objectKey: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
};

export const deleteVideoFromS3 = async (objectKey: string) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
  try {
    await s3.send(command);
  } catch (err) {
    console.error(err);
  }
};

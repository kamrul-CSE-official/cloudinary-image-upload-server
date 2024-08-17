declare module "multer-storage-cloudinary" {
  import { StorageEngine } from "multer";
  import {
    ConfigOptions,
    UploadApiOptions,
    UploadApiResponse,
  } from "cloudinary";

  class CloudinaryStorage implements StorageEngine {
    constructor(options: {
      cloudinary: ConfigOptions;
      params?:
        | UploadApiOptions
        | ((
            req: Express.Request,
            file: Express.Multer.File
          ) => UploadApiOptions);
    });

    _handleFile(
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error?: any, info?: Partial<Express.Multer.File>) => void
    ): void;

    _removeFile(
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error: Error) => void
    ): void;
  }

  export { CloudinaryStorage };
}

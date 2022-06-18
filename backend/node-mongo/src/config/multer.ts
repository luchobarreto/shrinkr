const path = require('path');
import multer, { StorageEngine, Options } from "multer";

export const multerStorage: StorageEngine = multer.memoryStorage();

export const multerConfig: Options = {
    storage: multerStorage,
}

export const multerUpload = multer(multerConfig);
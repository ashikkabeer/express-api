require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");
// ------------------------------------

const https = require("https");
const fs = require("fs");

const REGION = "sg"; // If German region, set this to an empty string: ''
const BASE_HOSTNAME = "storage.bunnycdn.com";
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = "wave-musaliar";
const ACCESS_KEY = "e3994ec2-147e-4958-82c6-400245e34e7a";

// ------------------------------------
class CloudServices {
  static bunnyStorage = (buffer) => {
    const readStream = fs.createReadStream(buffer);

    const options = {
      method: "PUT",
      host: HOSTNAME,
      path: `/${STORAGE_ZONE_NAME}/${uuidv4().replace(/-/g, '')}`,
      headers: {
        AccessKey: ACCESS_KEY,
        "Content-Type": "application/octet-stream",
      },
    };

    const req = https.request(options, (res) => {
      res.on("data", (chunk) => {
        console.log(chunk.toString("utf8"));
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    readStream.pipe(req);
  };

  static uploadImagetoCloudService = (buffer) => {
    let projectId = process.env.PROJECT_ID;
    let keyFilename = process.env.KEY_FILE;

    const storage = new Storage({
      projectId,
      keyFilename,
    });

    const bucket = storage.bucket("wave_first_project");
    return new Promise((resolve, reject) => {
      const filename = uuidv4() + "_post.jpg";
      console.log("file found... trying to upload", filename);
      const blob = bucket.file(filename); // storing by uuidv4()
      const blobStream = blob.createWriteStream();
      blobStream.on("error", (error) => {
        console.error("Error while uploading image:", error);
        reject(error);
      });
      blobStream.on("finish", () => {
        const imageUrl = `https://storage.cloud.google.com/wave_first_project/${filename}`;
        console.log("Image uploaded successfully:", imageUrl);
        resolve(imageUrl);
      });
      blobStream.end(buffer);
      console.log("image uploaded and ended");
    });
  };
}

module.exports = new CloudServices();

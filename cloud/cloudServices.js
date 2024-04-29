require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const NotificationToken = require("../schema/notificationtokens");

class CloudServices {
  static addTokenToTopic = async (topic, token) => {
    NotificationToken.findByIdAndUpdate(topic).then((res) => {
      res.fcmTokens.push(token);
      res.save();
    });
  };

  static sendNotifications = async (topic, user) => {
    const message = {
      topic: topic,
      notification: {
        body: user + "has sent a message",
        title: "New Message from Wave",
      },
    };

    try {
      const response = await admin.messaging().send(message);
      console.log(response.successCount + " messages were sent successfully");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  static uploadImagesToFirebase = async (buffer) => {
    try {
      const metadata = {
        contentType: "image/jpeg",
      };

      // Construct a reference to the storage location where the file will be uploaded
      const storageRef = ref(storage, `post/${uuidv4()}.jpg`);

      // Upload the file data to the specified storage location
      const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);

      console.log("Uploaded a blob or file!");

      // Retrieve the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);

      return downloadURL;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CloudServices;

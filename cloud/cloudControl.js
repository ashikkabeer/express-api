let CloudServices = require('./cloudServices')
// Import the functions you need from the SDKs you need


class CloudControls {
  static uploadImagetoCloud = async (buffer) => {
    const url = await CloudServices.uploadImagesToFirebase(buffer);
    return url;
  };
  static sendNotifications = async (topic, user) => {
    return await CloudServices.sendNotifications(topic, user);
  }
}

module.exports = CloudControls;

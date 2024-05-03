const PostServices = require("./postServices");

class PostControls {
  static create = async (req, res) => {
    console.log("in the create function");
    const response = await PostServices.createPostService(req);
    return res.status(200).send(response);
  };

  static retrieveAll = async (req, res) => {
    const data = await PostServices.renderAllPostsService();
    console.log("the data from controller", data);
    res.send(data);
  };
  static likePost = async (req, res) => {
    const postId = req.params.postId;
    const response = await PostServices.likePostService(postId);
    res.status(200).send(response);
  };
}

module.exports = PostControls;

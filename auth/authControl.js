const authServices = require("./authServices");

class authControls {
  static login = async (req, res) => {
    const token = await authServices.loginService(req);

    if (token) {
      return res.status(200).send({ access_token: token });
    } else {
      throw new Error("Authentication Failed");
    }
  };

  static signUp = async (req, res) => {
    const token = await authServices.signUpService(req.body);
    if (token) {
      return res.status(200).send({ access_token: token });
    } else {
      throw new Error("Signup Failed");
    }
  };

  // static logout = async (req, res) => {
  //   req.session.destroy(() => {
  //     res.redirect('/');
  //   });
  // };
}

module.exports = authControls;

// const Event = require("./eventModel");
const EventServices = require("./eventServices");
class EventControls {
  static async create(req, res) {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   throw new Error("No token provided");
    // }

    // const parts = authHeader.split(" ");

    // if (!parts.length === 2) {
    //   throw new Error("Token error");
    // }

    // const [scheme, token] = parts;

    // if (!/^Bearer$/i.test(scheme)) {
    //   throw new Error("Token malformatted");
    // }
    const response = EventServices.createEventService(req);
    return res.status(200).send(response);
    // if (token.user.role == "faculty") {
    //   const response = EventServices.createEventService(req);
    //   return res.status(200).send(response);
    // } else {
    //   return res.status(401).send("You are not authorized to create an event");
    // }
  }

  static async delete(req, res) {
    const response = EventServices.deleteEventService(req);
      return res.status(200).send(response);
  }
  static async get(req, res) {
    const response = EventServices.getEventService(req);
    res.status(200).send(response);
  }
}

module.exports = EventControls;

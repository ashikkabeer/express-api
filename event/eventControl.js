// const Event = require("./eventModel");
const EventServices = require("./eventServices");
class EventControls {
  static async create(req, res) {
    console.log("in the create function");
    console.log("req.body", req.body);
    console.log("req.user", req.user);

    const response = await EventServices.createEventService(
      req.user.username,
      req.body
    );
    console.log(response);
    return res.status(200).send(response);
  }

  static async delete(req, res) {
    const response = EventServices.deleteEventService(req);
    return res.status(200).send(response);
  }
  static async get(req, res) {
    console.log("in the get function");
    const response = await EventServices.getEventService();
    res.status(200).send(response);
  }
  static async interested(req, res) {
    const eventId = req.params.eventId;
    const username = req.user.username;
    const response = await EventServices.interestedService(eventId, username);

    res.status(200).send(response);
  }
  static eventInfo = async (req, res) => {
    const eventId = req.params.id;
    const event = await EventServices.getEventInfo(eventId);
    res.status(200).send(event);
  };
}

module.exports = EventControls;

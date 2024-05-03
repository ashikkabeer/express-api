const Event = require("../schema/event");

class EventServices {
  static async getEventInfo(eventId) {
    const event = await Event.findById(eventId);
    return event;
  }
  static async createEventService(author, data) {
    const info = {
      ...data,
      createdBy: author,
    };
    const event = await Event.create(info);
    return event;
  }
  static async interestedService(eventId, username) {
    const event = await Event.findByIdAndUpdate(eventId, {
      $addToSet: { participant: username },
    });
    return event;
  }

  static async deleteEventService() {}

  static async getEventService() {
    const events = await Event.find().sort({ date: 1 });
    const serializedEvents = events.map((event) => ({
      id: event._id.toString(),
      name: event.name,
      description: event.description,
      location: event.location,
      createdBy: event.createdBy,
      date: event.date.toDateString(),
      createdAt: event.createdAt.toDateString(),
    }));
    console.log("serializedEvents", serializedEvents);
    return serializedEvents;
  }
}

module.exports = EventServices;

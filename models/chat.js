const mongoose = require("mongoose");
const Joi = require("joi");

const chatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true // Opraveno: require → required
  },
  message: {
    type: String,
    required: true, // Opraveno: require → required
    minLength: 1,
    maxLength: 500
  },
  channel: {
    type: String,
    required: true // Opraveno: require → required
  },
  timestamp: {
    type: String,
    required: true // Opraveno: require → required
  },
  senderPbkHash: {
    type: String
  },
  receiverPbkHash: { // Poznámka: Správný pravopis je "receiverPbkHash" (s "e" před "i")
    type: String
  },
  seen: {
    type: Boolean
  }
});

const Chat = mongoose.model("Chat", chatSchema);

const validate = chat => {
  const schema = Joi.object({ // Přidáno Joi.object()
    name: Joi.string().required(),
    message: Joi.string()
        .required()
        .min(1)
        .max(500)
        .regex(/^(?!\s*$).+/),
    channel: Joi.string().required(),
    timestamp: Joi.string().required(),
    receiverPbkHash: Joi.string(),
    senderPbkHash: Joi.string(),
    seen: Joi.boolean()
  });

  return schema.validate(chat); // Opraveno: Joi.validate() → schema.validate()
};

module.exports = {
  Chat,
  validate
};


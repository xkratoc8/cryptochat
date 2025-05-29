const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true, // Oprava: "required" místo "require"
    minLength: 2,
    maxLength: 12
  },
  bio: {
    type: String,
    maxLength: 25,
    default: "A new CipherChat user..."
  },
  auth: {
    type: String,
    required: true // Oprava: "required" místo "require"
  },
  salt: {
    type: String
  },
  privateKeyCipher: {
    type: String
  },
  publicKey: {
    type: String
  },
  pbkHash: {
    type: String
  },
  status: {
    type: String,
    default: ""
  }
});

const User = mongoose.model("User", userSchema);

const generateToken = auth => {
  return jwt.sign({ auth }, config.get("jwtKey"));
};

// Opravená validace
const validate = (user) => {
  const schema = Joi.object({
    username: Joi.string()
        .required()
        .min(2)
        .max(12),
    bio: Joi.string()
        .default("A new CipherChat user...")
        .max(25),
    auth: Joi.string().required(),
    salt: Joi.string(),
    privateKeyCipher: Joi.string(),
    publicKey: Joi.string(),
    pbkHash: Joi.string(),
    status: Joi.string().default("")
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
  generateToken
};

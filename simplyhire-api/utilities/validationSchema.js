const Joi = require("joi");

const authSchema = Joi.object({
  username: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const authRegisterSchema = Joi.object({
  username: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
});

let dynamicData = Joi.object({
  title: Joi.string().required(),
  technology: Joi.string(),
  score: Joi.number(),
});

const interviewSchema = Joi.object({
  candidateName: Joi.string().required(),
  interviewerName: Joi.string().default("not available"),
  interviewerUsername: Joi.string().default("not available"),
  data: Joi.array().items(dynamicData).has(Joi.object().keys()),
  ovelAllScore: Joi.number(),
});

module.exports = {
  authSchema,
  interviewSchema,
  authRegisterSchema
};

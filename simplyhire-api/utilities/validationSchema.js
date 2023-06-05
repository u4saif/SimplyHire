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
  basicDeails: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    mobile: Joi.string().required(),
    otherNumber: Joi.string().allow(""),
    interviewDate: Joi.string().required(),
    qualification: Joi.string().required(),
    skills: Joi.array().min(1),
    resume: Joi.string().required(),
  }),
  jobDiscription: Joi.object({
    purpouse: Joi.string().required(),
    roleResponsiblity: Joi.string().required(),
  }),
  interviewPanel: Joi.object({
    panelistName: Joi.array().min(1),
  }),
});

module.exports = {
  authSchema,
  interviewSchema,
  authRegisterSchema,
};

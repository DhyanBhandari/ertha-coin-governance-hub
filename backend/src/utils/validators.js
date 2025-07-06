const Joi = require('joi');

// Auth validators
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Wallet validators
const topupSchema = Joi.object({
  amount: Joi.number().positive().max(10000).required(),
  paymentMethod: Joi.string().valid('upi', 'card', 'paypal').required()
});

const sendSchema = Joi.object({
  recipientEmail: Joi.string().email().required(),
  amount: Joi.number().positive().required()
});

// Proposal validators
const createProposalSchema = Joi.object({
  title: Joi.string().min(10).max(255).required(),
  description: Joi.string().min(50).max(5000).required(),
  requestedCoins: Joi.number().positive().max(50000).required(),
  deadline: Joi.date().min('now').required()
});

const voteSchema = Joi.object({
  voteType: Joi.string().valid('yes', 'no').required()
});

const investSchema = Joi.object({
  amount: Joi.number().positive().required()
});

module.exports = {
  signupSchema,
  loginSchema,
  topupSchema,
  sendSchema,
  createProposalSchema,
  voteSchema,
  investSchema
};
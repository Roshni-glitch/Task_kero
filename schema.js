const Joi = require('joi');

module.exports.taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    status: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.date().optional()
});



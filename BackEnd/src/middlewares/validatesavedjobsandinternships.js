import Joi from "joi";

export const validatesavedjobsandinternships = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    company: Joi.string().required().messages({
      "string.empty": "Company name is required",
      "any.required": "Company name is required",
    }),
    location: Joi.string().required().messages({
      "string.empty": "Location is required",
      "any.required": "Location is required",
    }),
    salary: Joi.object({
      amount: Joi.number().required().messages({
        "number.base": "Salary amount must be a number",
        "any.required": "Salary amount is required",
      }),
      currency: Joi.string().required().messages({
        "string.empty": "Currency is required",
        "any.required": "Currency is required",
      }),
    }).required(),
    description: Joi.string().required().messages({
      "string.empty": "Job description is required",
      "any.required": "Job description is required",
    }),
    selectionCriteria: Joi.object({
      fieldOfStudy: Joi.string().required().messages({
        "string.empty": "Field of study is required",
        "any.required": "Field of study is required",
      }),
      educationLevel: Joi.string().required().messages({
        "string.empty": "Education level is required",
        "any.required": "Education level is required",
      }),
      experience: Joi.string().required().messages({
        "string.empty": "Experience level is required",
        "any.required": "Experience level is required",
      }),
      certification: Joi.string(),
      workAuthorization: Joi.string(),
    }).required(),
    postedBy: Joi.string().required().messages({
      "string.empty": "Posted by user ID is required",
      "any.required": "Posted by user ID is required",
    }),
    isActive: Joi.boolean(),
  });
  next();
};

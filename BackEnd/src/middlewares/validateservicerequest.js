import Joi from "joi";

export const validateServiceRequest = (req, res, next) => {
  const schema = Joi.object({
    counselingtype: Joi.number()
      .valid(1, 2, 3)
      .required()
      .label("Counseling Type"),

    Date: Joi.date().greater("now").required().label("Date"),

    time: Joi.string()
      .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9] ?(AM|PM)?$/i) // supports both 24h or 12h format
      .required()
      .label("Time"),

    message: Joi.string().min(5).max(500).required().label("Message"),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      details: error.details.map((err) => err.message),
    });
  }

  next();
};

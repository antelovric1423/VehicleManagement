import Joi from "joi"

export const vehiclePostSchema = Joi.object({
    make: Joi.string()
        .min(1)
        .uppercase()
        .required(),

    model: Joi.string()
        .min(1)
        .uppercase()
        .required(),

    year: Joi.number()
        .positive()
        .required()

})
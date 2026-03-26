import * as Yup from "yup";

export const ProfileValid = Yup.object().shape({
    Fullname: Yup
    .string()
    .required()
    .min(6, "min 6 characters"),

    Email: Yup
    .string()
    .required()
    .email(),
    NationalId: Yup
    .number()
    .typeError('The value must be a number')
    .test('is-16-digits', 'The value must be a 16-digit number', (value) => 
      Number.isInteger(value) && value >= 10 ** 15 && value < 10 ** 16
    )
    .required('This field is required'),
    Phone: Yup
    .string()
    .required()
    .min(10, "min is 10 digit")
    .max(15, "max is 15 digit"),
   

    Province :Yup
    .string()
    .required()
    .min(6,"min is 6 characters")
    .max(18,"max is 18 character"),
    District: Yup
    .string()
    .required()
    .min(6,"min is 6 characters")
    .max(18,"max is 18 character"),

    Sector: Yup
    .string()
    .required()
    .min(4,"min is 4 characters")
    .max(18,"max is 18 character"),

    Cell:  Yup
    .string()
    .required()
    .min(4,"min is 4 characters")
    .max(18,"max is 18 character")
});

import * as Yup from "yup";

export const ProgramValid = Yup.object().shape({
    Name: Yup
    .string()
    .required()
    .min(6, "min 6 characters"),

    Beneficials: Yup
    .number()
    .typeError('Only number')
    .required('This field is required'),
    Description:  Yup
    .string()
    .required()
    .min(15,"min is 15 characters")
    .max(50,"max is 50 character")
});

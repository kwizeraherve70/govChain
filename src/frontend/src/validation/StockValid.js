import * as Yup from "yup";

export const StockValid = Yup.object().shape({
    StockName: Yup
    .string()
    .required()
    .min(3, "min 6 characters"),

    Quantity: Yup
    .number()
    .typeError('Only number')
    .required('This field is required'),
});

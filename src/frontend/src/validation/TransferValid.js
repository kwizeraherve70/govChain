import * as Yup from "yup";

export const TransferValid = Yup.object().shape({
    StockId: Yup
    .string()
    .required()
    .min(7, "min 6 characters"),

    Quantity: Yup
    .number()
    .typeError('Only number')
    .required('This field is required'),
});

export const DistributeValid = Yup.object().shape({
   
    Quantity: Yup
    .number()
    .typeError('Only number')
    .required('This field is required'),
});

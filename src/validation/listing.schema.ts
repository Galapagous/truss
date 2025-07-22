import * as yup from "yup";

export const productSchema = yup.object().shape({
  title: yup.string().required("Product title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters"),
  priceEth: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  image: yup
    .mixed()
    .test(
      "fileRequired",
      "Product image is required",
      (value: any) => value && value.length > 0
    ),
});

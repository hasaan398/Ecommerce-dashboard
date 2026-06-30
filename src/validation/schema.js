import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
export const addProductSchema = Yup.object({
  sku: Yup.string()
    .min(3, "SKU must be at least 3 characters")
    .required("SKU is required"),
  name: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .required("Product name is required"),
  brand: Yup.string()
    .required("Brand is required"),
  weight: Yup.number()
    .typeError("Weight must be a number")
    .positive("Weight must be greater than 0")
    .required("Weight is required"),
  category: Yup.string()
    .required("Please select a category"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  qty: Yup.number()
    .typeError("Quantity must be a number")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  status: Yup.string()
    .required("Please select a status"),
});
export const addCustomerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Customer name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  purchases: Yup.number()
    .typeError("Purchases must be a number")
    .min(0, "Purchases cannot be negative")
    .required("Total purchases is required"),
  qty: Yup.number()
    .typeError("Order quantity must be a number")
    .min(1, "Order quantity must be at least 1")
    .required("Order quantity is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
});

export const addOrderSchema = Yup.object({
  name: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .required("Product name is required"),
  customer: Yup.string()
    .min(3, "Customer name must be at least 3 characters")
    .required("Customer name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  payment: Yup.string()
    .required("Please select payment status"),
  status: Yup.string()
    .required("Please select order status"),
});
export default schema;
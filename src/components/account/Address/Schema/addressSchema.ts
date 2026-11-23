import * as Yup from "yup";

// Digits with an optional leading +, spaces or dashes: +8801750256844,
// 01750-256844, 031 123456.
const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{5,18}[0-9]$/;

/** Address fields shared by the address book and checkout. Limits mirror
 *  CreateAddressDto. */
export const addressFields = {
  label: Yup.string().trim().max(50, "Keep the label under 50 characters"),
  fullName: Yup.string()
    .trim()
    .required("Full name is required")
    .max(150, "Keep the name under 150 characters"),
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(PHONE_PATTERN, "Enter a phone number like +8801XXXXXXXXX"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .max(500, "Keep the address under 500 characters"),
  city: Yup.string()
    .trim()
    .required("City is required")
    .max(100, "Keep the city under 100 characters"),
  postcode: Yup.string()
    .trim()
    .max(20, "Keep the postcode under 20 characters"),
  country: Yup.string()
    .trim()
    .required("Country is required")
    .max(100, "Keep the country under 100 characters"),
};

export const addressSchema = Yup.object({
  ...addressFields,
  isDefault: Yup.boolean().default(false),
});

export type AddressFormValues = Yup.InferType<typeof addressSchema>;

export const EMPTY_ADDRESS: AddressFormValues = {
  label: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postcode: "",
  country: "Bangladesh",
  isDefault: false,
};

/** Form values → API body. Optional fields left blank are omitted rather
 *  than saved as empty strings. */
export const toAddressPayload = (
  values: Omit<AddressFormValues, "isDefault">
) => ({
  ...(values.label?.trim() && { label: values.label.trim() }),
  fullName: values.fullName.trim(),
  phone: values.phone.trim(),
  address: values.address.trim(),
  city: values.city.trim(),
  ...(values.postcode?.trim() && { postcode: values.postcode.trim() }),
  country: values.country.trim(),
});

import * as Yup from "yup";

import {
  addressFields,
  EMPTY_ADDRESS,
} from "@/src/components/account/Address/Schema/addressSchema";

export type AddressMode = "saved" | "new";

/** An address field that is only validated when the customer is typing a new
 *  address instead of picking a saved one. */
const whenNewAddress = (schema: Yup.StringSchema<string | undefined>) =>
  Yup.string().when("addressMode", {
    is: "new",
    then: () => schema,
    otherwise: (s) => s.optional(),
  });

export const checkoutSchema = Yup.object({
  addressMode: Yup.mixed<AddressMode>().oneOf(["saved", "new"]).required(),
  addressId: Yup.string().when("addressMode", {
    is: "saved",
    then: (s) => s.required("Choose a delivery address"),
    otherwise: (s) => s.optional(),
  }),
  label: whenNewAddress(addressFields.label),
  fullName: whenNewAddress(addressFields.fullName),
  phone: whenNewAddress(addressFields.phone),
  address: whenNewAddress(addressFields.address),
  city: whenNewAddress(addressFields.city),
  postcode: whenNewAddress(addressFields.postcode),
  country: whenNewAddress(addressFields.country),
  note: Yup.string()
    .trim()
    .max(500, "Keep the note under 500 characters")
    .optional(),
});

export type CheckoutSchemaForm = Yup.InferType<typeof checkoutSchema>;

export const checkoutDefaultValues: CheckoutSchemaForm = {
  addressMode: "saved",
  addressId: "",
  label: EMPTY_ADDRESS.label,
  fullName: EMPTY_ADDRESS.fullName,
  phone: EMPTY_ADDRESS.phone,
  address: EMPTY_ADDRESS.address,
  city: EMPTY_ADDRESS.city,
  postcode: EMPTY_ADDRESS.postcode,
  country: EMPTY_ADDRESS.country,
  note: "",
};

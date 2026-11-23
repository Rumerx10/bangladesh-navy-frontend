import { ErrorType } from "@/src/components/shared/types/common";
import { AddressFormValues } from "../Schema/addressSchema";

/** A saved address, as returned by the /address API. */
export interface IAddress {
  id: string;
  label: string | null;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postcode: string | null;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Query key for the signed-in user's address book. */
export const ADDRESSES_QUERY_KEY = ["addresses"];

/** The API keeps at most this many addresses per user. */
export const MAX_SAVED_ADDRESSES = 10;

export interface IAddressFormProps {
  isEditMode?: boolean;
  onSubmit: (data: AddressFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
}

export interface ICreateUpdateAddressProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IAddress;
}

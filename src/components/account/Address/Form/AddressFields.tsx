import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import InputLabel from "@/src/components/shared/InputLabel";

/** The address inputs, shared by the address book dialog and checkout. Must
 *  render inside a FormProvider whose values include `addressFields`. */
const AddressFields = ({ fieldClassName = "bg-light" }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <InputLabel label="Full name" required />
      <ControlledInputField
        className={fieldClassName}
        name="fullName"
        placeholder="Name of the person receiving the order"
        autoComplete="name"
        maxLength={150}
      />
    </div>
    <div>
      <InputLabel label="Phone" required />
      <ControlledInputField
        className={fieldClassName}
        name="phone"
        type="tel"
        placeholder="+8801XXXXXXXXX"
        autoComplete="tel"
        maxLength={20}
      />
    </div>
    <div className="sm:col-span-2">
      <InputLabel label="Address" required />
      <ControlledTextareaField
        className={fieldClassName}
        name="address"
        placeholder="House, road, area"
        maxLength={500}
      />
    </div>
    <div>
      <InputLabel label="City" required />
      <ControlledInputField
        className={fieldClassName}
        name="city"
        placeholder="e.g. Chattogram"
        autoComplete="address-level2"
        maxLength={100}
      />
    </div>
    <div>
      <InputLabel label="Postcode" />
      <ControlledInputField
        className={fieldClassName}
        name="postcode"
        placeholder="e.g. 4100"
        autoComplete="postal-code"
        maxLength={20}
      />
    </div>
    <div>
      <InputLabel label="Country" required />
      <ControlledInputField
        className={fieldClassName}
        name="country"
        autoComplete="country-name"
        maxLength={100}
      />
    </div>
    <div>
      <InputLabel label="Label" />
      <ControlledInputField
        className={fieldClassName}
        name="label"
        placeholder="e.g. Home, Office"
        maxLength={50}
      />
    </div>
  </div>
);

export default AddressFields;

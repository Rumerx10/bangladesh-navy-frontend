import * as Yup from "yup";

export const tidalStationSchema = Yup.object({
  generalArea: Yup.string().required("General area is required"),
  location: Yup.string().required("Location is required"),
  latitude: Yup.string().required("Latitude is required"),
  longitude: Yup.string().required("Longitude is required"),
  productId: Yup.string().required("Product is required"),
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"])
    .required("Status is required"),
});

export type TidalStationFormValues = Yup.InferType<typeof tidalStationSchema>;

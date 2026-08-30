import { Metadata } from "next";
import CancellationsClient from "./CancellationsClient";

export const metadata: Metadata = {
  title:
    "My Cancellations | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "View your cancelled orders.",
};

const CancellationsPage = () => {
  return <CancellationsClient />;
};

export default CancellationsPage;

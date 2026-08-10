import { Metadata } from "next";
import ReturnsClient from "./ReturnsClient";

export const metadata: Metadata = {
  title: "My Returns | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Track your returned orders.",
};

export default function ReturnsPage() {
  return <ReturnsClient />;
}

import { useState } from "react";
import { getBaseUrl } from "../config/envConfig";

export function useImageUpload() {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const uploadImage = async (file: File | null) => {
    if (!file) {
      setError("No image selected");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${getBaseUrl()}/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data?.success) {
        setError(data?.message || "Upload failed");
        return;
      }

      setUrl(data?.data?.secure_url);
      return data?.data?.secure_url;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    url,
    isLoading,
    error,
    setUrl,
  };
}
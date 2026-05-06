import { ErrorType } from "@/src/components/shared/types/common";
import { SignupFormType } from "../Schema";

export interface SignupFormProps {
  onSubmit: (data: SignupFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}

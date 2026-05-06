import { ErrorType } from "@/src/components/shared/types/common";
import { LoginFormType } from "../Schema";

export interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void;
  onGoogleSuccess?: (role: string) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}

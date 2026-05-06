import { ErrorType } from "@/src/components/shared/types/common";
import { ProfileFormValues } from "../Schema/profileSchema";

export interface ProfilePictureSectionProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  initialProfilePicture?: string;
}

export interface IProfileForm {
  onSubmit: (data: ProfileFormValues) => void;
  onCancel: () => void;
  isPending?: boolean;
  error?: ErrorType;
  userEmail?: string;
  userProfilePicture?: string;
  firstName?: string;
  lastName?: string;
}

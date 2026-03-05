import { IUserDraft, IUserValidationErrors } from '@domain/users/user.interface';

export interface ICreateUserPageVMOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export interface ICreateUserPageVM {
  draft: IUserDraft;
  validationErrors: IUserValidationErrors | null;

  isSavingUser: boolean;
  isSubmitDisabled: boolean;

  setField: (field: keyof IUserDraft, value: string) => void;
  validateOnBlur: (field: keyof IUserDraft) => void;
  getFieldError: (field: keyof IUserDraft) => string | undefined;
  submit: () => Promise<void>;
}


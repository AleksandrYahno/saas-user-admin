import { useCallback, useState } from 'react';

import { IUserDraft, IUserValidationErrors } from '@domain/users/user.interface';
import { validateUserDraft } from '@domain/users/user.validation';
import useAppStoreContext from '@providers/appStoreProvider/appStoreContext';
import { createUserCommand } from '@providers/appStoreProvider/appStoreStore/usersSlice/usersCommands';

import {
  ICreateUserPageVM,
  ICreateUserPageVMOptions,
} from './createUserPageVM.interface';

const DRAFT_FIELDS: (keyof IUserDraft)[] = [
  'fullName',
  'email',
  'role',
  'password',
  'confirmPassword',
];

const buildInitialDraft = (): IUserDraft => ({
  fullName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
});

const useCreateUserPageVM = (
  options?: ICreateUserPageVMOptions,
): ICreateUserPageVM => {
  const {
    appStore,
  } = useAppStoreContext();

  const {
    isSavingUser,
  } = appStore((state) => state.usersSlice);

  const [
    draft,
    setDraft,
  ] = useState<IUserDraft>(buildInitialDraft);

  const [
    validationErrors,
    setValidationErrors,
  ] = useState<IUserValidationErrors | null>(null);

  const [
    touchedFields,
    setTouchedFields,
  ] = useState<Set<keyof IUserDraft>>(() => new Set());

  const {
    onSuccess,
    onError,
  } = options ?? {};

  const setField = useCallback(
    (field: keyof IUserDraft, value: string): void => {
      setDraft((prevDraft) => ({
        ...prevDraft,
        [field]: value,
      }));

      setValidationErrors((prevErrors) => {
        if (prevErrors === null) {
          return prevErrors;
        }

        const nextErrors: IUserValidationErrors = {
          ...prevErrors,
        };

        delete nextErrors[field];

        return Object.keys(nextErrors).length > 0 ? nextErrors : null;
      });
    },
    [],
  );

  const validateOnBlur = useCallback((field: keyof IUserDraft): void => {
    setTouchedFields((prev) => {
      const next = new Set(prev);

      next.add(field);

      return next;
    });

    const errors = validateUserDraft(draft);

    setValidationErrors(errors ?? null);
  }, [
    draft,
  ]);

  const isFieldEmpty = useCallback((field: keyof IUserDraft): boolean => {
    const value = draft[field];

    if (field === 'fullName' || field === 'email') {
      return value.trim() === '';
    }

    return value === '';
  }, [
    draft,
  ]);

  const getFieldError = useCallback((field: keyof IUserDraft): string | undefined => {
    if (!touchedFields.has(field)) {
      return undefined;
    }

    if (isFieldEmpty(field)) {
      return undefined;
    }

    return validationErrors?.[field];
  }, [
    touchedFields,
    validationErrors,
    isFieldEmpty,
  ]);

  const isSubmitDisabled =
    isSavingUser || validateUserDraft(draft) !== null;

  const submit = useCallback(async (): Promise<void> => {
    setTouchedFields((prev) => new Set([...prev, ...DRAFT_FIELDS]));

    setValidationErrors(null);

    const result = await createUserCommand(
      appStore,
      draft,
      { onError },
    );

    if (result !== null) {
      setValidationErrors(result);

      return;
    }

    if (onSuccess !== undefined) {
      onSuccess();
    }
  }, [
    appStore,
    draft,
    onError,
    onSuccess,
  ]);

  return {
    draft,
    validationErrors,
    isSavingUser,
    isSubmitDisabled,
    setField,
    validateOnBlur,
    getFieldError,
    submit,
  };
};

export default useCreateUserPageVM;


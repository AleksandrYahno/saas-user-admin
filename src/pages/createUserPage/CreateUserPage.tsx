import { FC, ReactElement, SubmitEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { getUserRoleOptions } from '@config/roles';
import useCreateUserPageVM from '@pages/createUserPage/vm/useCreateUserPageVM';
import { Button } from '@shared/UIkit/button/Button';
import { Select } from '@shared/UIkit/select/Select';
import { TextField } from '@shared/UIkit/textField/TextField';

import './CreateUserPage.css';

const CreateUserPage: FC = (): ReactElement => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const roleOptions = getUserRoleOptions(t);

  const createUserPageVM = useCreateUserPageVM({
    onSuccess: () => {
      enqueueSnackbar(t('create_user_page.user_created'), { variant: 'success' });

      void navigate('/users');
    },
    onError: (message) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    void createUserPageVM.submit();
  };

  return (
    <div className="create-user-page">
      <h2>
        {t('create_user_page.title')}
      </h2>

      <form
        className="create-user-page__form"
        onSubmit={handleSubmit}
      >
        <TextField
          label={t('create_user_page.full_name_label')}
          name="fullName"
          type="text"
          autoComplete="name"
          required
          value={createUserPageVM.draft.fullName}
          onChange={(value) => createUserPageVM.setField('fullName', value)}
          onBlur={() => createUserPageVM.validateOnBlur('fullName')}
          error={createUserPageVM.getFieldError('fullName')}
        />

        <TextField
          label={t('create_user_page.email_label')}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={createUserPageVM.draft.email}
          onChange={(value) => createUserPageVM.setField('email', value)}
          onBlur={() => createUserPageVM.validateOnBlur('email')}
          error={createUserPageVM.getFieldError('email')}
        />

        <Select
          label={t('create_user_page.role_label')}
          name="role"
          required
          placeholder=" "
          value={createUserPageVM.draft.role}
          onChange={(value) => createUserPageVM.setField('role', value)}
          onBlur={() => createUserPageVM.validateOnBlur('role')}
          error={createUserPageVM.getFieldError('role')}
          options={roleOptions}
        />

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextField
              label={t('create_user_page.password_label')}
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={createUserPageVM.draft.password}
              onChange={(value) => createUserPageVM.setField('password', value)}
              onBlur={() => createUserPageVM.validateOnBlur('password')}
              error={createUserPageVM.getFieldError('password')}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <TextField
              label={t('create_user_page.confirm_password_label')}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={createUserPageVM.draft.confirmPassword}
              onChange={(value) => createUserPageVM.setField('confirmPassword', value)}
              onBlur={() => createUserPageVM.validateOnBlur('confirmPassword')}
              error={createUserPageVM.getFieldError('confirmPassword')}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={createUserPageVM.isSubmitDisabled}
          >
            {t('create_user_page.submit_button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;


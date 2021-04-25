import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ! Components
import PasswordCreateComponent from '../../components/auth/PasswordCreateComponent';

const PasswordReset = () => {
  const intl = useIntl();
  const history = useHistory();

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'password_reset',
      })}
      onBackClick={() => {
        history.goBack();
      }}
    >
      <PasswordCreateComponent />
    </Page>
  );
};

export default PasswordReset;

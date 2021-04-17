import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useIntl } from 'react-intl';

// ! Components
import SignInComponent from '../../components/auth/SignInComponent';

const SignIn = () => {
  const intl = useIntl();

  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <SignInComponent />
    </Page>
  );
};

export default SignIn;

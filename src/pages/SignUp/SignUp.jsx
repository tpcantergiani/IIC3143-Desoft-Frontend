import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ! Components
import SignUpComponent from '../../components/auth/SignUpComponent';

const SignUp = () => {
  const intl = useIntl();
  const history = useHistory();

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'registration',
        defaultMessage: ' Sign up',
      })}
      onBackClick={() => {
        history.goBack();
      }}
    >
      <SignUpComponent />
    </Page>
  );
};

export default SignUp;

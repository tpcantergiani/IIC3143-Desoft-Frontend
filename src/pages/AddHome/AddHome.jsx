import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ! Components
import AddHomeComponent from '../../components/auth/AddHomeComponent';

const AddHome = (props) => {
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
      <AddHomeComponent />
    </Page>
  );
};

export default AddHome;

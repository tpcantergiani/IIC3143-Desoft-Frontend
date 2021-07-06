import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ! Components
import NewEntryGuardComponent from '../../components/NewEntryGuard/NewEntryGuardComponent';
// import FileUpload from '../../firebase/firebase';

const NewEntryGuard = () => {
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
      <NewEntryGuardComponent />
    </Page>
  );
};

export default NewEntryGuard;

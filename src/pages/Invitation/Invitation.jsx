import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ! Components
import InvitationComponent from '../../components/invitation/InvitationComponent';

const Invitation = () => {
  const intl = useIntl();
  const history = useHistory();

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'invitation_info',
        defaultMessage: 'Invitation',
      })}
      onBackClick={() => {
        history.goBack();
      }}
    >
      <InvitationComponent />
    </Page>
  );
};

export default Invitation;

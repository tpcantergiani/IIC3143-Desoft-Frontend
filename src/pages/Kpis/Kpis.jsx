import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';
import TableauReport from 'tableau-react';

const Kpis = () => {
  const intl = useIntl();

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{
          height: '100%', width: '100%', display: 'flex', flex: 1,
        }}
      >
        <TableauReport url="https://public.tableau.com/views/modulodeestadstica/Cantidaddeinvitacionesatravsdeltiempo?:language=es-ES&:display_count=n&:origin=viz_share_link" />
        <TableauReport url="https://public.tableau.com/views/Entries_16253514255320/Entradasesperadasvsnoesperadasatravsdeltiempo?:language=es-ES&:display_count=n&:origin=viz_share_link" />
        {intl.formatMessage({ id: 'home' })}
      </Scrollbar>
    </Page>
  );
};
export default Kpis;

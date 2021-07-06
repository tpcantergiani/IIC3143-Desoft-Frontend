import Button from '@material-ui/core/Button';
import Page from 'material-ui-shell/lib/containers/Page';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ToastDemo = () => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const {
    current,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (current.type !== 'Guard') {
      history.push('/notfound');
    }
  });

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'toast_demo',
        defaultMessage: 'Toast demo',
      })}
    >
      <br />
      <Button
        onClick={() => {
          enqueueSnackbar(intl.formatMessage({
            id: 'addUser',
            defaultMessage: 'Toast demo',
          }), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
        }}
      >
        OPEN Toast
      </Button>
    </Page>
  );
};
export default ToastDemo;

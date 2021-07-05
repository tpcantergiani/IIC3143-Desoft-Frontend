import Page from 'material-ui-shell/lib/containers/Page';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Camera from '@material-ui/icons/CameraAlt';
import Delete from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Save from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { useAuth } from 'base-shell/lib/providers/Auth';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question';
import ImgageUploadDialog from 'material-ui-shell/lib/containers/ImageUploadDialog';
import HomePlatesComponent from '../../components/plates/HomePlatesComponent';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3,
    )}px`,
  },
}));

const HomePlates = () => {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const { auth, updateAuth, setAuth } = useAuth();
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
      <Paper className={classes.paper} elevation={2}>
        <HomePlatesComponent />
      </Paper>
    </Page>
  );
};

export default HomePlates;

/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import App from 'base-shell/lib';
import MUIConfig from 'material-ui-shell/lib';
import merge from 'base-shell/lib/utils/config';
import _config from './config';

const config = merge(MUIConfig, _config);

const Demo = () => <App config={config} />;

export default Demo;

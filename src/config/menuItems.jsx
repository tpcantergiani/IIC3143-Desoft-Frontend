import React from 'react';
import {
  AccountBox as AccountBoxIcon,
  ExitToApp as ExitToAppIcon,
  GetApp,
  InfoOutlined,
  Language as LanguageIcon,
  Lock as LockIcon,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
  Web,
  GroupAdd,
  HomeWork,
  Home,
  Assessment,
  History,
  Email,
  DirectionsCar,
  LocalShipping,
  Lock,
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

import allLocales from './locales';
import allThemes from './themes';

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props;

  const {
    isAuthMenuOpen,
  } = menuContext;
  const {
    themeID, setThemeID,
  } = themeContext;

  const { auth, setAuth } = authData;
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext;

  const localeItems = allLocales.map((l) => ({
    value: undefined,
    visible: true,
    primaryText: intl.formatMessage({ id: l.locale }),
    onClick: () => {
      updateLocale(l.locale);
    },
    leftIcon: <LanguageIcon />,
  }));

  const isAuthorised = auth.isAuthenticated;

  const dispatch = useDispatch();

  const themeItems = allThemes.map((t) => ({
    value: undefined,
    visible: true,
    primaryText: intl.formatMessage({ id: t.id }),
    onClick: () => {
      setThemeID(t.id);
    },
    leftIcon: <StyleIcon style={{ color: t.color }} />,
  }));

  // esto pasa cuando se aprieta el mono del menu
  if (isAuthMenuOpen || !isAuthorised) {
    return [
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
            setAuth({ isAuthenticated: false });
            dispatch(
              logoutUser(),
            );
          }
          : () => { },
        visible: true,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
    ];
  }

  if (auth.current?.type === ('Admin')) {
    return [
      {
        value: '/home',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'my_account' }),
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: '/new_entry_guard',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'entry' }),
        leftIcon: <DirectionsCar />,
      },
      {
        value: '/invitation',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'invitation_info' }),
        leftIcon: <Email />,
      },
      {
        value: '/signup',
        primaryText: intl.formatMessage({ id: 'dialog_demo', defaultMessage: 'Demos' }),
        visible: isAuthorised && (auth.current.type === 'Admin'),
        primaryTogglesNestedList: true,
        leftIcon: <GroupAdd />,
      },
      // {
      //   value: '/home',
      //   visible: isAuthorised,
      //   primaryText: intl.formatMessage({ id: 'dashboard' }),
      //   leftIcon: <Assessment />,
      // },
      {
        value: '/visit_history',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'invitation_history' }),
        leftIcon: <History />,
      },
      { divider: true },
      {
        value: '/create_password',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'changePassword' }),
        leftIcon: <Lock />,
      },
      {
        primaryText: intl.formatMessage({ id: 'settings' }),
        primaryTogglesNestedList: true,
        leftIcon: <SettingsIcon />,
        nestedItems: [
          {
            primaryText: intl.formatMessage({ id: 'theme' }),
            secondaryText: intl.formatMessage({ id: themeID }),
            primaryTogglesNestedList: true,
            leftIcon: <StyleIcon />,
            nestedItems: themeItems,
          },
          {
            primaryText: intl.formatMessage({ id: 'language' }),
            secondaryText: intl.formatMessage({ id: locale }),
            primaryTogglesNestedList: true,
            leftIcon: <LanguageIcon />,
            nestedItems: localeItems,
          },
        ],
      },
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
            setAuth({ isAuthenticated: false });
            dispatch(
              logoutUser(),
            );
          }
          : () => { },
        visible: isAuthorised,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
      {
        value: null,
        visible: isAppInstallable && !isAppInstalled,
        onClick: () => {
          deferredPrompt.prompt();
        },
        primaryText: intl.formatMessage({
          id: 'install',
          defaultMessage: 'Install',
        }),
        leftIcon: <GetApp />,
      },
    ];
  }

  if (auth.current?.type === ('Guard')) {
    return [
      {
        value: '/home',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'my_account' }),
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: '/new_entry_guard',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'entry' }),
        leftIcon: <DirectionsCar />,
      },
      {
        value: '/invitation',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'supplier' }),
        leftIcon: <LocalShipping />,
      },
      {
        value: '/filter_demo',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'history' }),
        leftIcon: <History />,
      },
      { divider: true },
      {
        value: '/create_password',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'changePassword' }),
        leftIcon: <Lock />,
      },
      {
        primaryText: intl.formatMessage({ id: 'settings' }),
        primaryTogglesNestedList: true,
        leftIcon: <SettingsIcon />,
        nestedItems: [
          {
            primaryText: intl.formatMessage({ id: 'theme' }),
            secondaryText: intl.formatMessage({ id: themeID }),
            primaryTogglesNestedList: true,
            leftIcon: <StyleIcon />,
            nestedItems: themeItems,
          },
          {
            primaryText: intl.formatMessage({ id: 'language' }),
            secondaryText: intl.formatMessage({ id: locale }),
            primaryTogglesNestedList: true,
            leftIcon: <LanguageIcon />,
            nestedItems: localeItems,
          },
        ],
      },
      {
        value: null,
        visible: isAppInstallable && !isAppInstalled,
        onClick: () => {
          deferredPrompt.prompt();
        },
        primaryText: intl.formatMessage({
          id: 'install',
          defaultMessage: 'Install',
        }),
        leftIcon: <GetApp />,
      },
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
            setAuth({ isAuthenticated: false });
            dispatch(
              logoutUser(),
            );
          }
          : () => { },
        visible: isAuthorised,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
      {
        value: null,
        visible: isAppInstallable && !isAppInstalled,
        onClick: () => {
          deferredPrompt.prompt();
        },
        primaryText: intl.formatMessage({
          id: 'install',
          defaultMessage: 'Install',
        }),
        leftIcon: <GetApp />,
      },
    ];
  }
  if (auth.current?.type === ('Resident')) {
    return [
      {
        value: '/home',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'my_account' }),
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: '/invitation',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'invitation_info' }),
        leftIcon: <Email />,
      },
      {
        value: '/visit_history',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'invitation_history' }),
        leftIcon: <History />,
      },
      {
        value: '/entry_history',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'entry_history' }),
        leftIcon: <History />,
      },
      { divider: true },
      {
        value: '/create_password',
        visible: isAuthorised,
        primaryText: intl.formatMessage({ id: 'changePassword' }),
        leftIcon: <Lock />,
      },
      {
        primaryText: intl.formatMessage({ id: 'settings' }),
        primaryTogglesNestedList: true,
        leftIcon: <SettingsIcon />,
        nestedItems: [
          {
            primaryText: intl.formatMessage({ id: 'theme' }),
            secondaryText: intl.formatMessage({ id: themeID }),
            primaryTogglesNestedList: true,
            leftIcon: <StyleIcon />,
            nestedItems: themeItems,
          },
          {
            primaryText: intl.formatMessage({ id: 'language' }),
            secondaryText: intl.formatMessage({ id: locale }),
            primaryTogglesNestedList: true,
            leftIcon: <LanguageIcon />,
            nestedItems: localeItems,
          },
        ],
      },
      {
        value: null,
        visible: isAppInstallable && !isAppInstalled,
        onClick: () => {
          deferredPrompt.prompt();
        },
        primaryText: intl.formatMessage({
          id: 'install',
          defaultMessage: 'Install',
        }),
        leftIcon: <GetApp />,
      },
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
            setAuth({ isAuthenticated: false });
            dispatch(
              logoutUser(),
            );
          }
          : () => { },
        visible: isAuthorised,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
      {
        value: null,
        visible: isAppInstallable && !isAppInstalled,
        onClick: () => {
          deferredPrompt.prompt();
        },
        primaryText: intl.formatMessage({
          id: 'install',
          defaultMessage: 'Install',
        }),
        leftIcon: <GetApp />,
      },
    ];
  }

  return [
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'home' }),
      leftIcon: <Home />,
    },
    {
      value: '/invitation',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'invitation_info' }),
      leftIcon: <Email />,
    },
    { divider: true },
    {
      value: '/create_password',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'changePassword' }),
      leftIcon: <Lock />,
    },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
      ],
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt();
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
    {
      value: '/signin',
      onClick: isAuthorised
        ? () => {
          setAuth({ isAuthenticated: false });
          dispatch(
            logoutUser(),
          );
        }
        : () => { },
      visible: isAuthorised,
      primaryText: isAuthorised
        ? intl.formatMessage({ id: 'sign_out' })
        : intl.formatMessage({ id: 'sign_in' }),
      leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt();
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ];
};
export default getMenuItems;

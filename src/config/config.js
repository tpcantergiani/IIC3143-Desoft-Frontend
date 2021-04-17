import { lazy } from 'react';
import parseLanguages from 'base-shell/lib/utils/locale';
import locales from './locales';
import routes from './routes';
import themes from './themes';

const config = {
  auth: {
    signInURL: '/signin',
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    onError: (e) => {
      console.warn(e);
    },
  },
  menu: {
    MenuContent: lazy(() => import('../components/Menu/MenuContent')),
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultIsDarkMode: false,
    defaultIsRTL: false, // change this to true for default Right to Left Language support
  },
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
};

export default config;

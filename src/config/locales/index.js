const locales = [
  {
    locale: 'es',
    messages: import('./es'),
    // loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/es`),
  },
  {
    locale: 'en',
    messages: import('./en'),
    // loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/en`),
  },
];

export default locales;

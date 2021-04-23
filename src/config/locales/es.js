import { defineMessages } from 'react-intl';

const messages = defineMessages({
  app_name: 'ReGuard',
  sign_in: 'Iniciar Sesión',
  sign_out: 'Cerrar Sesión',
  sign_up: 'Registrarse',
  email: 'Email',
  username: 'Username',
  password: 'Constraseña',
  about: 'About',
  home: 'Home',
  page_not_found: 'Page not found',
  settings: 'Configuración',
  theme: 'Theme',
  default: 'Default',
  red: 'Rojo',
  green: 'Verde',
  language: 'Languaje',
  en: 'English',
  menu: 'Menu',
  menu_mini_mode: 'Mini menu',
  offline: 'Offline',
  demos: 'Demos',
  dialog_demo: 'Crear Usuarios',
  dialog_title: 'Dialog title',
  dialog_action: 'YES, Delete',
  dialog_message: `Dialog message. You can put as much text as you want here. 
  Ask a question or show a warning before deleting something. 
  You can also set the action text to something like "YES, Delete" and run that action by passing a "handleAction" prop. 
  This receives a "handleClose" callback with which you can close the dialog when your action is done.`,
  toast_demo: 'Crear Viviendas',
  filter_demo: 'Demo filter',
  list_page_demo: 'List Page demo with {count} rows',
  forgot_password: 'Olvidé mi contraseña',
  password_reset: 'Volver a crear contraseña',
  password_confirm: 'Confirmar Contraseña',
  registration: 'Registro',
  my_account: 'Mi Perfil',
  delete_account_dialog_title: 'Eliminar usuario?',
  delete_account_dialog_message:
    'Tu usuario será eliminado y perderas toda tu información!',
  delete_account_dialog_action: 'Delete account',
  cruds: 'Agregar Datos',
});

export default messages;

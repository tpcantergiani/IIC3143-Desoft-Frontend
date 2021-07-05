/* eslint-disable react/jsx-key */
import React, { lazy } from 'react';
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute';
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute';
import { Route } from 'react-router-dom';

const SignIn = lazy(() => import('../pages/SignIn/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp/SignUp'));
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'));
const About = lazy(() => import('../pages/About'));
const Home = lazy(() => import('../pages/Home/Home'));
const DialogDemo = lazy(() => import('../pages/DialogDemo/DialogDemo'));
const ToastDemo = lazy(() => import('../pages/ToastDemo/ToastDemo'));
const FilterDemo = lazy(() => import('../pages/FilterDemo'));
const ListPageDemo = lazy(() => import('../pages/ListPageDemo'));
const TabsDemo = lazy(() => import('../pages/TabsDemo'));
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'));
const NewEntryGuard = lazy(() => import('../pages/NewEntryGuard/NewEntryGuard'));
const CreatePassword = lazy(() => import('../pages/PasswordCreate/PasswordCreate'));
const Invitation = lazy(() => import('../pages/Invitation/Invitation'));
const InvitationHistory = lazy(() => import('../pages/InvitationsHistory/InvitationsHistory'));
const UsersList = lazy(() => import('../pages/UsersList/UsersList'));
const Kpis = lazy(() => import('../pages/Kpis/Kpis'));
const EntryHistory = lazy(() => import('../pages/EntryHistory/EntryHistory'));

const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/home" exact component={SignIn} />,
  <UnauthorizedRoute
    path="/password_reset"
    redirectTo="/"
    exact
    component={PasswordReset}
  />,
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/signup" exact component={SignUp} />,
  <AuthorizedRoute path="/create_password" exact component={CreatePassword} />,
  <AuthorizedRoute path="/my_account" exact component={MyAccount} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/dialog_demo" exact component={DialogDemo} />,
  <AuthorizedRoute path="/toast_demo" exact component={ToastDemo} />,
  <AuthorizedRoute path="/filter_demo" exact component={FilterDemo} />,
  <AuthorizedRoute path="/list_page_demo" exact component={ListPageDemo} />,
  <AuthorizedRoute path="/tabs_demo" exact component={TabsDemo} />,
  <AuthorizedRoute path="/new_entry_guard" exact component={NewEntryGuard} />,
  <AuthorizedRoute path="/invitation" exact component={Invitation} />,
  <AuthorizedRoute path="/visit_history" exact component={InvitationHistory} />,
  <AuthorizedRoute path="/users_list" exact component={UsersList} />,
  <AuthorizedRoute path="/kpis" exact component={Kpis} />,
  <AuthorizedRoute path="/entry_history" exact component={EntryHistory} />,

];

export default routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateBlank from '../components/TemplateBlank';
import TemplateSidebar from '../components/TemplateSidebar';

// Routes
import Home from '../components/Home';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import Error from '../components/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateSidebar>
          <Home {...props} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateBlank>
          <SignUpContainer {...props} Layout={SignUpComponent} />
        </TemplateBlank>
      )}
    />
    <Route
      path="/login"
      render={props => (
        <TemplateBlank>
          <LoginContainer {...props} Layout={LoginComponent} />
        </TemplateBlank>
      )}
    />
    <Route
      path="/forgot-password"
      render={props => (
        <TemplateBlank>
          <ForgotPasswordContainer {...props} Layout={ForgotPasswordComponent} />
        </TemplateBlank>
      )}
    />
    <Route
      path="/update-profile"
      render={props => (
        <TemplateSidebar>
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/search"
      render={props => (
        <TemplateSidebar>
          <RecipesContainer {...props} Layout={RecipesComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/recipes"
      render={props => (
        <TemplateSidebar>
          <RecipesContainer {...props} Layout={RecipesComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/recipe/:id"
      render={props => (
        <TemplateSidebar>
          <RecipesContainer {...props} Layout={RecipeViewComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Przepraszamy, podana strona nie istnieje." />
        </TemplateSidebar>
      )}
    />
  </Switch>
);

export default Index;

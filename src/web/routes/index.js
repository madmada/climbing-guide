import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateBlank from '../components/TemplateBlank';
import TemplateSidebar from '../components/TemplateSidebar';

// Routes
import Home from '../components/Home';
import Member from '../../containers/Member';

import ArticlesComponent from '../components/Articles';

import RecipesContainer from '../../containers/Recipes';
import RecipeViewComponent from '../components/Recipe';

import RocksContainer from '../../containers/Rocks';
import RocksComponent from '../components/RockList';
import RockViewComponent from '../components/Rock';


import AddRockContaier from '../../containers/AddRock';
import AddRockComponent from '../components/AddContent/AddRock';

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
          <Member {...props} Layout={Home} />
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
        <TemplateBlank>
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateBlank>
      )}
    />
    <Route
      path="/rocks"
      render={props => (
        <TemplateSidebar>
          <RocksContainer {...props} Layout={RocksComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/rock/:id"
      render={props => (
        <TemplateSidebar>
          <RocksContainer {...props} Layout={RockViewComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/recipes"
      render={props => (
        <TemplateSidebar>
          <RocksContainer {...props} Layout={ArticlesComponent} />
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
      path="/add"
      render={props => (
        <TemplateSidebar>
          <AddRockContaier {...props} Layout={AddRockComponent} />
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

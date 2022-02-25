import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import pageViewGa from './config/pageViewGa';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login'))
const Register = React.lazy(() => import('./views/pages/register'))
const Page404 = React.lazy(() => import('./views/pages/page404'))
const Page500 = React.lazy(() => import('./views/pages/page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={pageViewGa(Login)} />
            <Route exact path="/register" name="Register Page" component={pageViewGa(Register)} />
            <Route exact path="/404" name="Page 404" component={pageViewGa(Page404)} />
            <Route exact path="/500" name="Page 500" component={pageViewGa(Page500)} />
            <Route path="/" name="Home" component={pageViewGa(DefaultLayout)} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App

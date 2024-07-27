import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Statistics } from '../../pages';

const Routes = () => {
   return(
      <Switch>
         <Route path="/" exact component={ Home } />
         <Route path="/statistics" exact component={ Statistics } />
      </Switch>
   )
}

export default Routes;
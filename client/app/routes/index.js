/* # ---------------------------------------------
# ---------------------------------------------
# Author: Richie Roldan
# Date:   Monday December 9th 2019
# Last Modified by: Richie Roldan - <roldan.rv@achealth.com.ph>
# Last Modified time: January 11th 2020, 6:41:03 pm
# ---------------------------------------------
# --------------------------------------------- */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../containers/HomePage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

const Routes = () => (
  <Switch>
    {/* public routes */}
    <Route exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;

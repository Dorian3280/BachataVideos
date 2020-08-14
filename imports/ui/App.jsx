import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from '/imports/ui/pages/Home';
import DanceVideos from '/imports/ui/pages/DanceVideos';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/*" component={DanceVideos}></Route>
    </Switch>
  </Router>
);

export default App;
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './views/authentication'
import Assessment from './views/Assessment'
import CandidateRegisterForAssessment from './views/CandidateRegisterForAssessment'

import QuestionManagement from './views/QuestionManagement'

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/assessment" component={Assessment}/>
      <Route path="/admin" component={Admin} />
      {/* <Route path="/CandidateRegisterForAssessment" component={CandidateRegisterForAssessment}/> */}
      {/* <Route path="/invite-candidate" component={InviteCandidate}/> */}
      {/* <Route path="/question-management" component={QuestionManagement}/> */}
      <Route path="/" component={Login}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);

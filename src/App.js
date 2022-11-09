import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import ScreensAbout from "./screens/About";
import NotFound from "./screens/NotFound";
// import TechnicalPause from "./screens/TechnicalPause/TechnicalPause.jsx";

import Login from "./screens//Login_Register_Menu/Login/Login"
import Home from "./screens/Home";
import Test from "./screens/Test";
import TestView from "./screens/ContentMakers/TestView";
import MainMenu from "./screens/MainMenu";
import Courses from "./screens/Courses"
import SurveyDemographics from "./screens/SurveyDemographics"
import SurveyFeedback from "./screens/SurveyFeedback"
import Typeform from "./screens/Typeform"
import LoadingScreen from "./screens/LoadingScreen"
import Register from "./screens/Login_Register_Menu/Register/Register";
import Landing from "./screens/Landing/Landing";

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" children={()=><Landing />}/>
            <Route path="/about" component={ScreensAbout}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/home" component={Courses}/>
            <Route path="/typeform/:id" component={Typeform}/>
            <Route path={"/loading"} component={LoadingScreen}/>
            <Route exact path="/subject/:id" component={MainMenu} />
            <Route exact path="/subject/:id/:mode/:testId" component={Test} />
            <Route exact path={"/preview/:id"} component={TestView}/>
            <Route exact path={"/404"} component={NotFound}/>
            <Route path="*" component={NotFound} />

        </Switch>
    </Router>
);

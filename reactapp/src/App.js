

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';



import EventName from './reducers/EventNameReducer'
import EventPass from './reducers/EventPasswordReducer'
import token from './reducers/token';
import hostId from './reducers/hostId';
import EventID from './reducers/EventIDReducer'
import EventPlaylist from './reducers/PlaylistReducer'
import GuestPassword from './reducers/guestPasswordReducer'
import GuestID from './reducers/GuestIDReducer'



import Onboarding from './onboarding';
import Winner from './Winner';
import MentionsLegales from './MentionsLegales';

import DJhoteFirstScreen from './host/DJhoteFirstScreen';
import SignUp from './host/SignUp';
import SignIn from './host/SignIn';
import HomeHost from './host/HomeHost';
import SecondeHomeHost from './host/SecondeHomeHost';
import EventCreation from './host/EventCreation';
import SongListCreation from './host/SongListCreation';
import TimerConfigFIRST from './host/TimerConfigFIRST';
import ShareEvent from './host/ShareEvent';

import Enregistrement from './guest/Enregistrement';
import HomeGuest from './guest/HomeGuest';
import VoteOK from './guest/VoteOK';


const store = createStore(combineReducers({EventName, token, hostId, EventPass, EventID, EventPlaylist, GuestPassword, GuestID}))


function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Onboarding} path="/" exact />
          <Route component={MentionsLegales} path="/MentionsLegales" exact />
          <Route component={DJhoteFirstScreen} path="/DJhoteFirstScreen" exact />
          <Route component={SignUp} path="/SignUp" exact />
          <Route component={SignIn} path="/SignIn" exact />
          <Route component={HomeHost} path="/HomeHost" exact />
          <Route component={SecondeHomeHost} path="/SecondeHomeHost" exact />
          <Route component={EventCreation} path="/EventCreation" exact />
          <Route component={SongListCreation} path="/SongListCreation" exact />
          <Route component={TimerConfigFIRST} path="/TimerConfigFIRST" exact />
          <Route component={ShareEvent} path="/ShareEvent" exact />
          <Route component={Winner} path="/Winner" exact />
          <Route component={Enregistrement} path="/Enregistrement" exact />
          <Route component={HomeGuest} path="/HomeGuest" exact />
          <Route component={VoteOK} path="/VoteOK" exact />

        </Switch>
      </Router>
    // </Provider>
    

  );
}

export default App;

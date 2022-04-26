import React, { Component } from 'react';
import AppNavBar from './Components/AppNavBar';
import EventList from './Components/eventListContainer';
import EventContainer from './eventContainer/eventContainer';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'reactstrap';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <EventList />
            <EventContainer></EventContainer>
          </Container>
        </div>
      </Provider> 
    );
  }
}

export default App;

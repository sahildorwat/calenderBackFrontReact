import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jQuery from 'jquery';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  componentDidMount = () => {
      // console.log('in here')
     jQuery.ajax({
      type: 'GET',
      url: 'http://localhost:3001/appointments'
      })
     .done(data => {
      // console.log(data);
      this.setState({appointments: data });
      }).catch(data => {console.log(data)})
    }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {this.state.appointments.map(appointment => {
              return(<p key = {appointment.id}>{appointment.title}</p>);})
          }
        </div>
      </div>
    );
  }
}

export default App;

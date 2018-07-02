import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'
import Appointments from '../containers/appointments'
import Appointment from './appointment'
import AppHeader from './appHeader'
import AppointmentForm from './appointmentForm'
import Login from './login'
import '../assets/appointments.css'


export default (props) => {
  return (
			<Router>
				<div className='body'>
				  <AppHeader  {...props}/>
				  <h1> React calender </h1>
				  <h3> Appointments</h3>
				  <Route path='/' exact 				component={Appointments}/>
				  <Route path='/login' exact 			component={Login} />
				  <Route path='/appointments/:id' exact component={Appointment} />
				  <Route path='/appointments/:id/edit' 	component={AppointmentForm} />
				</div>
			</Router>
		)
}
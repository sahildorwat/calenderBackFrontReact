import React, {Component} from 'react'
import AppointmentForm from '../components/appointmentForm'
import AppointmentsList from './appointmentsList'
import $ from 'jquery'
import '../assets/appointments.css'

class Appointments extends React.Component{
   constructor(props){
   	super(props)
   		this.state =  {
		   appointments: this.props.appointments,
     	 }

   }
  
   componentDidMount() {
   		console.log('In component did mount', sessionStorage.user)
	 		$.ajax({
	 		type: "GET",
	 		url: 'http://localhost:3001/appointments',
	 		dataType: "JSON",
      headers: JSON.parse(sessionStorage.getItem('user'))
	 	}).done(data => {
	 		// console.log(data)
	 		this.setState({appointments: data})
	 	})
   }


   addNewAppointment = (appointment) => {
      console.log('showing data for add new appointment ', appointment)
      const appointments = this.state.appointments.map(appointment => appointment)
      appointments.push(appointment);
      this.setState({appointments: appointments.sort(function(a,b){
            return new Date(a.appt_time) - new Date(b.appt_time);
          })})
  }

   static defaultProps = {
   		appointments: []
   }

    

	render() {
      return (
        <div >
	         <AppointmentForm addNewAppointment ={(apt) => this.addNewAppointment(apt)}/>
	          <AppointmentsList appointments={this.state.appointments} />
        </div>
      )
    }
}

export default Appointments;
import React from 'react'
import Appointment from '../components/appointment'

const AppointmentsList =  (props) => {
	
	const appointments = (
		<div>
			{props.appointments.map(appointment => {
    			return <Appointment key= {appointment.id} appointment={appointment} />
    				  })}
		</div>
		)


	return appointments
}


export default AppointmentsList;
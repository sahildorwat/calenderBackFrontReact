import React , { Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'

export default class Appointment extends Component {
	 constructor (props) {
	  super(props)
	  this.state = {
	  		appointment: props.appointment
	  }
	 }
	 // static propType = {
	 //  appointment: PropTypes.object.isRequired
	 // }


	 componentDidMount = () => {

 	// console.log('printing props :',this.props)
	 	if(this.props.match && sessionStorage.user){
	 		$.ajax({
	 		type: "GET",
	 		url: `http://localhost:3001/appointments/${this.props.match.params.id}`,
	 		dataType: "JSON",
	 		headers: JSON.parse(sessionStorage.getItem('user'))
	 	}).done(data => {
	 		console.log()
	 		this.setState({appointment: data})
	 	})
	 	}
	 }
	 
	 static defaultProps = {
	 	appointment: {}
	 }
	 render () {

	 	console.log('in appointments.jsx')
	 	// console.log(this.props.appointment.id)
	 	 // const path = '/appointments/'+  this.props.appointment.id 
	 	 // console.log(path)
	  return (
			   <div className='appointment'>
				    <Link to={`/appointments/${this.state.appointment.id}`} ><h3>{this.state.appointment.title}</h3></Link>
		              <p> {this.state.appointment.title ? moment(this.state.appointment.apt_time).format('MMMM DD YYYY, h:mm:ss a'): ''} </p>
			   		<Link to = {`/appointments/${this.state.appointment.id}/edit`} style={{color: 'brown'}} > edit </Link>
			   </div>
		  )
	 }
}









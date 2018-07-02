import React, {Component} from 'react'
import Label from './label'
import Datetime from 'react-datetime'
import moment from 'moment'
import FormErrors from './formErrors'
import $ from 'jquery'
import '../assets/datetime.css'

class AppointmentForm extends React.Component{
  constructor(props){
    super(props)
      this.state =  {
       title: 'Team standup meeting',
       apt_time: new Date(),
       formErrors: null,
       isFormValid: false,
       editing: false
       }

   }
  componentDidMount() {
      // console.log('In component did mount')
      if(this.props.match){
        // console.log('editing the appointment')
          $.ajax({
              type: "GET",
              url: `http://localhost:3001/appointments/${this.props.match.params.id}`,
              dataType: "JSON",
               headers: JSON.parse(sessionStorage.getItem('user')),

            }).done(data => {
              // console.log('editing ' ,data)
              this.setState({ title: data.title, 
                              apt_time: new Date(data.apt_time) ,
                              editing:( this.props.match.path === '/appointments/:id/edit')
                            })
            }).fail(response => {
              this.setState({isFormValid: false })
            })

      }
      
   }

   handleUserInput = (obj ) => {
      this.setState(obj,this.validateForm);
    }

    validateForm =  () =>{
      this.setState({isFormValid: this.state.title.trim().length > 2})
    }

    handleFormSubmit = () => {
      const appointment = {title: this.state.title, apt_time: this.state.apt_time}

      this.state.editing ?
        this.updateAppointment(appointment) : this.addAppointment(appointment)
    }    


    addAppointment (appointment){
    // console.log(appointment)
        $.ajax({
        type: "POST", 
        url: "http://localhost:3001/appointments",
        data: {appointment: appointment},
        headers: JSON.parse(sessionStorage.getItem('user')),
        success: (data, textStatus, jqXHR) => {
                    this.setState({formErrors : null})
                    this.props.addNewAppointment(data)
                } ,
        error: (response) => this.setState({formErrors: response.responseJSON })  
       });
    }
    

    updateAppointment (appointment){
      console.log("in update ", appointment)
        $.ajax({
        type: "PATCH", 
        url: `http://localhost:3001/appointments/${this.props.match.params.id}`,
        data: {appointment: appointment},
        headers: JSON.parse(sessionStorage.getItem('user')),
        success: (data, textStatus, jqXHR) => {
                    this.setState({formErrors : null})
                    // this.props.addNewAppointment(data)
                    console.log('updated successfully ', data)
                } ,
        error: (response) => this.setState({formErrors: response.responseJSON })  
       });
    }
  
  handleChange = (e) => {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.handleUserInput(obj);
  }


  dateHandleChange = (e) => {
    this.handleUserInput({apt_time: new Date(e)});
  }


  submitHandler = (e) => {
  	e.preventDefault();
  	this.handleFormSubmit();
  }
  
  deleteAppointment=()=> {
    // console.log('in delete handler')
    // if(confirm("are you sure u want to delete this appointment ?")){
        $.ajax({
        type: "DELETE", 
        url: `http://localhost:3001/appointments/${this.props.match.params.id}`,
        headers: JSON.parse(sessionStorage.getItem('user')),
        success: (data) => {
                    this.setState({formErrors : null})
                    // this.props.addNewAppointment(data)
                    console.log('deleted successfully ', data)
                    this.props.history.push("/")
                } ,
        error: (response) => this.setState({formErrors: response.responseJSON })  
       });
    // }
  }

  render() {
    
    console.log(this.state.editing)
    let formErrors=null
    if(this.state.formErrors)
          formErrors=<FormErrors formErrors={this.state.formErrors} />
    return (
      <div>
        <h2>{ this.state.editing ?  "Update the appointment" : "Make a new appointment"}</h2>
          {formErrors}
        <form onSubmit = {(e) => this.submitHandler(e)} className="formClass" >
          <Label label= "title" />
          <input  name='title'
                  placeholder='Appointment Title'
				          value  = { this.state.title}
				          onChange = { this.handleChange } />

          <Label label="apt_time"/>
          <br />
          <Datetime onChange = {this.dateHandleChange } 
                    value = {this.state.apt_time}
                    name= "apt_time"/>
          <br />
          <br />
          <input  type='submit' 
                  value={ this.state.editing ?  "Update appointment" : 'Make Appointment'} 
                  className="submit-button" 
                  disabled = {!this.state.isFormValid}/>

        </form>   
        {this.state.editing && (  <p><button onClick= { this.deleteAppointment }> Delete Appointment </button></p>  )}     
      </div>
    )
    }
}

export default AppointmentForm;
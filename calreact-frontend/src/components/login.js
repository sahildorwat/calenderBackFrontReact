import React , {Component} from 'react'
import $ from 'jquery'

export default class Login extends Component {

	submitHandler = (e) => {
		e.preventDefault()
		console.log('in lgin')
		$.ajax({
			type: 'post',
			url: 'http://localhost:3001/auth/sign_in',
			data: {
				email: this.email.value,
				password: this.password.value
			}
		}).done((response, status, jqXHR)=> {
			console.log(jqXHR)
			sessionStorage.setItem('user', 
				JSON.stringify({
					'access-token': jqXHR.getResponseHeader("access-token"),
					'client': jqXHR.getResponseHeader('client'),
					'uid': response.data.uid
				})
				);
			console.log('in here')
			this.props.history.push('/')
		}).catch(res => console.log(res))
	}

	render(){
		
		return (
			<div>
				<form onSubmit= {this.submitHandler}>
					<label> Email </label>
					<br />
					<input name = 'email' ref= {(input) => this.email = input} />
					<br />
					<label> password </label>
					<br />
					<input  name= 'passeord' ref = {(input) => this.password = input } />
					<br />
					<br />	
					<input type='submit' /> 
				</form>
			</div>
			)
	}
}

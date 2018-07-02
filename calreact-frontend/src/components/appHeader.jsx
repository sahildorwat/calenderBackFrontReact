import React, { Component } from 'react'
import { Link ,Redirect } from 'react-router-dom'
import $ from 'jquery'


export default class AppHeader extends Component{
	constructor(props){
		super(props)
		this.state ={
			redirecting : false
		} 
	}

	componentDidMount =() =>{
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3001/auth/sign_out',
			headers: JSON.parse(sessionStorage.getItem('user')) ,
			dataType: 'JSON'
		}).fail(() => this.setState({redirecting: true}) )
	}

	signoutHandler =(e) =>{
		e.preventDefault();
		console.log(sessionStorage.getItem('user'))
		$.ajax({
			type: 'DELETE',
			url: 'http://localhost:3001/auth/sign_out',
			data: JSON.parse(sessionStorage.getItem('user')) 
		}).done(()=> {
			sessionStorage.removeItem('user')
			this.setState({redirecting: true})
			// console.log(this.props)
			// this.props.history.push('/login')
		})
	}

	render(){
		  console.log(this.props)

		return (
				<div>
					{this.state.redirecting ? <Redirect to="/login" /> :null}
					{sessionStorage.getItem('user') && (<p> 
					{	JSON.parse(sessionStorage.getItem('user')).uid}
					<a href="#" onClick={this.signoutHandler}>signout</a> </p>
					)}
					<Link to="/" >
						<h1> Home </h1>
					</Link>
				</div>
			)
	}
}
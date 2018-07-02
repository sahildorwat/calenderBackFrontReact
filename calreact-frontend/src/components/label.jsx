import React , { Component }from 'react'

class Label extends React.Component {
  render () {
    return (
    	<div>
        	<b>{this.props.label}</b>
        </div>
    );
  }
}


export default Label;
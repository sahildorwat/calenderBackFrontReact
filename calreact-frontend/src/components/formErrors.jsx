import React from 'react'

const formErrors = (props) => {
	console.log(props.formErrors)
	return (
		<div>
			{Object.keys(props.formErrors).map(formErrorField => {
				return (
						props.formErrors[formErrorField].map(error => {
							return <p> {formErrorField}  {error} </p>
						})
					)
			})} 
		</div>
		)
}

export default formErrors;
import React from 'react'
import './Form.css'

const Form = props => {
    return (
        <form onSubmit={props.submit}>
            <input type="text" onChange={props.change} value={props.value} />
            <button>Submit</button>
        </form>
    );
}

export default Form;
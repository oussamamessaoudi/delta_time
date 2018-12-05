import React from "react"
import PropTypes from "prop-types"

const ERROR_MESSAGE = 'invalid date!';

 const Input = ({label, isValid, value, id, onChange}) => (
    <div>
        <label htmlFor={id} >{label}</label>
        <input value={value} name={id}  onChange={(event) => onChange(event.target.value)}/>
        <span style={{color : 'red'}}>{isValid === false ?ERROR_MESSAGE:null}</span>
    </div>
        );
Input.proptypes = {
    label : PropTypes.string,
    isValid : PropTypes.bool,
    value : PropTypes.string,
    id : PropTypes.string,
    onChange : PropTypes.func
};
export default Input;

import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";



const DeltaForm =({from, to, onValid, numberOfDays}) => (
    <div>
        <form onSubmit={(event) => { event.preventDefault(); onValid(); }}>
            <Input {...from} />
            <Input {...to} />
            <input type='submit' value='Calculate'/>
            {numberOfDays != null?<p>Number of days : {numberOfDays}</p>:null}
        </form>
    </div>
);

DeltaForm.propTypes = {
    from            : PropTypes.object,
    to              : PropTypes.object,
    onValid         : PropTypes.func,
    numberOfDays    : PropTypes.number
};
export default DeltaForm;
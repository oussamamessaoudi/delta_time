import React, {Component} from "react"
import Input from "../component/Input";


export default class DeltaForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            valueFrom   : {value : "", isValid : undefined, parsed : undefined},
            valueTo     : {value : "", isValid : undefined, parsed : undefined},
        }
    }
    static SEPARATE_DATE = "/";
    static PATTERN_DATE = /^\d{2}\/\d{2}\/\d{4}$/;
    getDate = (dateString) => {
        if(!DeltaForm.PATTERN_DATE.test(dateString))
            return false;
        const parts = dateString.split(DeltaForm.SEPARATE_DATE);
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if(year < 0 || month === 0 || month > 12)
            return false;

        const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
            monthLength[1] = 29;

        // Check the range of the day
        if (day > 0 && day <= monthLength[month - 1]){
            return new Date(year, month-1, day);
        }
        else {
            return null;
        }
    };

    onChange = (key) => (date) => {
        this.setState({[key]:{value : date, isValid : undefined}})
    };

    onValid = (event) => {
        const {valueFrom, valueTo} = this.state;
        let  dateFrom, dateTo;
        if ((dateFrom = this.getDate(valueFrom.value)) !== null){
            if ((dateTo = this.getDate(valueTo.value)) !== null){
                this.setState({valueFrom : {...valueFrom, isValid : true, parsed : dateFrom}, valueTo : {...valueTo, isValid : true, parsed : dateTo}});
            }
            else{
                this.setState({valueFrom : {...valueFrom, isValid : true, parsed : dateFrom}, valueTo : {...valueTo, isValid : false}});
            }

        }
        else {
            if((dateTo = this.getDate(valueTo.value)) !== null)
                this.setState({valueFrom : {...valueFrom, isValid : false}, valueTo : {...valueTo, isValid : true, parsed : dateTo}});
            else
                this.setState({valueFrom : {...valueFrom, isValid : false}, valueTo : {...valueTo, isValid : false}});
        }
        event.preventDefault();
    };

    static ONE_DAY = 1000*60*60*24;
    calculate = () => {
        const {valueFrom, valueTo} = this.state;
        if (valueFrom.isValid && valueTo.isValid) {
            const diffTime = valueTo.parsed.getTime() - valueFrom.parsed.getTime();
            return Math.floor(diffTime/DeltaForm.ONE_DAY);
        }
        return null;
    };

    render() {
        const {valueFrom, valueTo } = this.state;
        const numberOfDays = this.calculate();
        return <div>
            <form onSubmit={this.onValid}>
                <Input {...valueFrom} id='from' label='date from :' onChange={this.onChange('valueFrom')}/>
                <Input {...valueTo} id='to' label='date To :' onChange={this.onChange('valueTo')}/>
                <input type='submit' value='Calculate'/>
                {numberOfDays === null?null:<p>Number of days : {numberOfDays}</p>}
            </form>
        </div>;
    }


}
import React, {Component} from "react"
import DeltaForm from "../component/DeltaForm";


export default class DeltaFormProvider extends Component{
    constructor(props) {
        super(props);
        this.state = {
            from   : {value : "", isValid : undefined, parsed : undefined},
            to     : {value : "", isValid : undefined, parsed : undefined},
            result : undefined
        }
    }

    static SEPARATE_DATE = "/";
    static PATTERN_DATE = new RegExp(`^\\d{2}${DeltaFormProvider.SEPARATE_DATE}\\d{2}${DeltaFormProvider.SEPARATE_DATE}\\d{4}$`);
    getDate = (dateString) => {
        if(!DeltaFormProvider.PATTERN_DATE.test(dateString))
            return null;
        const parts = dateString.split(DeltaFormProvider.SEPARATE_DATE);
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
        this.setState({[key]:{value : date}})
    };

    onValid = () => {
        const {from, to} = this.state;
        let  dateFrom, dateTo;
        if ((dateFrom = this.getDate(from.value)) !== null){
            if ((dateTo = this.getDate(to.value)) !== null){
                this.setState({
                        from    : {...from, isValid : true},
                        to      : {...to, isValid : true},
                        result  : this.calculate(dateFrom,  dateTo)
                });
            }
            else{
                this.setState({from : {...from, isValid : true}, to : {...to, isValid : false}, result: undefined});
            }

        }
        else {
            if(this.getDate(to.value) !== null)
                this.setState({from : {...from, isValid : false}, to : {...to, isValid : true}, result: undefined});
            else
                this.setState({from : {...from, isValid : false}, to : {...to, isValid : false}, result: undefined});
        }
    };

    static ONE_DAY = 1000*60*60*24;
    calculate = (from, to) => {
        const diffTime = to.getTime() - from.getTime();
        return Math.floor(diffTime/DeltaFormProvider.ONE_DAY);
    };

    inputProps = (key) => {
        const input = this.state[key];
        return {
            value       : input.value,
            id          : input.id,
            label       : `Date ${key} :`,
            isValid     : input.isValid ,
            onChange    : this.onChange(key)
        }
    };

    render() {
        return <div>
            <DeltaForm 
                from            = {this.inputProps('from')}
                to              = {this.inputProps('to')}
                numberOfDays    = {this.state.result}
                onValid         = {this.onValid} />
        </div>;
    }
}
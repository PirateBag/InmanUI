export class Rule {

    constructor( {isAnumber, min, max, errorMessage, values, successMessage  }  ) {

        this.isAnumber = isAnumber;
        this.min = min;
        this.max = max;
        this.errorMessage = errorMessage;
        this.values = values;
        this.successMessage = successMessage;
    }

    validate( {value: x }) {
        let returnValue = "";
        if ( this.successMessage !== undefined ) {
            returnValue = this.successMessage;
        }

        if ( this.isAnumber !== undefined  ) {
            if ( this.isAnumber ) {
                if ( isNaN( x ) ) {
                    returnValue = "'" + x + "' is not a number";
                }
            }
        }

        if ( this.min !== undefined ) {
            if ( x < this.min ) {
                returnValue = "Input of '" + x + "' is less than minimum of '" + this.min;
            }
        }
        if ( this.max !== undefined ) {
            if ( x > this.max ) {
                returnValue = "Input of '" + x + "' is greater than maxmimum of '" + this.max;
            }
        }
        return returnValue;
    }
}

export default Rule;

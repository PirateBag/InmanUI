
export class Field{

    constructor( {   fieldName , tableName, lengthOf, isUpper=false,
                     decimalPlaces=0, isCurrency=false, rules=undefined }  ) {
        this.fieldName = fieldName;
        this.tableName = tableName;
        this.lengthOf = lengthOf;
        this.isUpper = isUpper;
        this.decimalPlaces = decimalPlaces;
        this.isCurrency = isCurrency;
        this.rules = rules;
    }
}

export default Field;

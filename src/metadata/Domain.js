import Field from './Field.js'

export const id =  new Field( { fieldName : 'id', tableName : 'item', lengthOf : 10,
    horizontalLabel : "Id" } );

export const summaryId =  new Field( { fieldName : 'summaryId', tableName : 'item', lengthOf : 10,
        horizontalLabel : "Summary Id" } );

export const description =  new Field( {   fieldName : 'description' , tableName : 'item', lengthOf : 30, horizontalLabel : "Description" } );

export const unitCost =  new Field( {   fieldName : 'unitCost', tableName : 'item', lengthOf : 10,
    isUpper : false,
    decimalPlaces : 2, isCurrency : true, horizontalLabel : "Unit Cost" } );

export const list = [ summaryId, description, unitCost ];


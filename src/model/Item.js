import Field from '../metadata/Field.js'

export class Item {

    constructor({id = 0, summaryId = 'W-0', description = '', unitCost = 0.0}) {
        this.id = id;
        this.summaryId = summaryId;
        this.description = description;
        this.unitCost = unitCost;
    }

  }

Item.menuHeader = new Field( { fieldName : null, tableName : 'item', icon : 'hamberger',  });

Item.idField = new Field({
        fieldName: 'id', tableName: 'item', lengthOf: 10,
        horizontalLabel: "Id"
    });


Item.summaryIdField = new Field({
        fieldName: 'summaryId', tableName: 'item', lengthOf: 10,
        horizontalLabel: "Summary Idz"
    });


Item.descriptionField = new Field({
        fieldName: 'description',
        tableName: 'item',
        lengthOf: 30,
        horizontalLabel: "Description"
    });


Item.unitCostField = new Field({
        fieldName: 'unitCost', tableName: 'item', lengthOf: 10,
        isUpper: false,
        decimalPlaces: 2, isCurrency: true, horizontalLabel: "Unit Cost"
    });

Item.gridWithDeleteEdit = [ Item.menuHeader,Item.idField, Item.summaryIdField,
        Item.descriptionField, Item.unitCostField ];



export default Item;

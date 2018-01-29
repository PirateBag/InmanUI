export class Item {

    constructor({id = 0, summaryId = 'W-0', description = '', unitCost = 0.0}) {
        this.id = id;
        this.summaryId = summaryId;
        this.description = description;
        this.unitCost = unitCost;
    }

    const
    menuHeader = new Field( { fieldName : null, tableName : 'item', icon : 'hamberger',  })

    const
    id = new Field({
        fieldName: 'id', tableName: 'item', lengthOf: 10,
        horizontalLabel: "Id"
    });


    const
    summaryId = new Field({
        fieldName: 'summaryId', tableName: 'item', lengthOf: 10,
        horizontalLabel: "Summary Id"
    });


    const
    description = new Field({
        fieldName: 'description',
        tableName: 'item',
        lengthOf: 30,
        horizontalLabel: "Description"
    });


    const
    unitCost = new Field({
        fieldName: 'unitCost', tableName: 'item', lengthOf: 10,
        isUpper: false,
        decimalPlaces: 2, isCurrency: true, horizontalLabel: "Unit Cost"
    });

    const
    gridWithDeleteEdit = [ menuHeader,id, summaryId, description, unitCost ];

  }


export default Item;

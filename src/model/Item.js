import React from 'react';
import Field from '../metadata/Field.js'
import LineButton from '../metadata/LineButton.js'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'


export class Item {

    constructor({id = 0, summaryId = 'W-0', description = '', unitCost = 0.0}) {
        this.id = id;
        this.summaryId = summaryId;
        this.description = description;
        this.unitCost = unitCost;
    }
}

Item.deleteLineButton = new LineButton( { toolTip : "Delete", icon:
    <DeleteIcon/>
    }  );
Item.EditLineButton = new LineButton( { toolTip : "Edit", icon:
        <EditIcon/>
}  );

Item.CancelLineButton = new LineButton( { toolTip : "Cancel", icon:
        <CancelIcon/>
}  );



Item.menuHeader = new Field( { fieldName : null, tableName : 'item', icon : 'hamberger',
    rowLineButtons: [ Item.deleteLineButton, Item.EditLineButton]});

Item.selectedMenuHeader = new Field( { fieldName : null, tableName : 'item', icon : 'hamberger',
    rowLineButtons: [ Item.CancelLineButton ]});


Item.idField = new Field({
        fieldName: 'id', tableName: 'item', lengthOf: 10,
        horizontalLabel: "Id"
    });

Item.summaryIdField = new Field({
        fieldName: 'summaryId', tableName: 'item', lengthOf: 10,
        horizontalLabel: "Summary Id"
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

Item.gridWithCancel = [ Item.selectedMenuHeader,Item.idField, Item.summaryIdField,
    Item.descriptionField, Item.unitCostField ];


export default Item;

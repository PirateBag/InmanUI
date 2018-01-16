export class Item{

    constructor( {   id = 0, summaryId = 'W-0', description ='', unitCost = 0.0 } ) {
        this.id = id;
        this.summaryId = summaryId;
        this.description = description;
        this.unitCost = unitCost;
    }
}

export default Item;

/**
 * Created by osboxes on 17/07/17.
 */
import React from "react";
import AddItem from "./AddItem.js";
import ItemLine from "./ItemLine.js"


class ItemList extends React.Component {
    constructor( props, context ) {
        super( props, context );
        this.handleFlipSelect = this.handleFlipSelect.bind(this);
    }

    ItemLister(itemResponse) {
        if (itemResponse.errors != null && itemResponse.errors.length > 0) {
            return ( itemResponse.errors.map((anError) =>
                    <tr key={anError.key}>
                        <td>{anError.message}</td>
                    </tr>
                )
            )
        }

        if (itemResponse.data == null || itemResponse.data.length === 0)

            return (
                <tr>
                    <td>These query parameters did not match any data.</td>
                </tr>
            )

        return (
            itemResponse.data.map((anItem) =>
                <ItemLine item={anItem} isSelected={false} setSelectState={null}/>
            ) )
    }

    render() {

        if (this.props.ItemResponse == null) {
            return (
                <div>
                    <h4>Query criteria specified no results.</h4>
                    <AddItem Mode={this.props.Mode} doneWithAdding={this.props.DoneWithAdding}/>
                </div>
            )
        } else {
            return (
                <div >
                    <table className="propertyForm">
                        <thead>
                        <tr>
                            <td className="cellNumeric">Item Id</td>
                            <td className="cellText">Summary Id</td>
                            <td className="cellText">Description</td>
                            <td className="cellNumeric">Unit Cost</td>
                        </tr>
                        </thead>

                        <tbody>
                        {this.props.itemResponse.data.map((anItem) =>
                            <ItemLine item={anItem} isSelected={false} setSelectState={null}/>
                        ) }

                        //  {this.ItemLister(this.props.ItemResponse)}
                        </tbody>
                    </table>
                    <AddItem Mode={this.props.Mode} doneWithAdding={this.props.DoneWithAdding}/>
                </div>
            );
        }
    }
}

export default ItemList;


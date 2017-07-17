/**
 * Created by osboxes on 17/07/17.
 */
import React from 'react';
import AddItem from './AddItem.js'

function ItemLister( itemResponse ) {
    if ( itemResponse.errors != null && itemResponse.errors.length >0 )  {
        return ( itemResponse.errors.map( ( anError ) =>
                <tr key={anError.key}>
                    <td>{anError.message}</td>
                </tr>
            )
        )
    }

    if ( itemResponse.data == null || itemResponse.data.length === 0 )

        return (
            <tr>
                <td>These query parameters did not match any data.</td>
            </tr>
        )

    return ( itemResponse.data.map( ( anItem ) =>
        <tr key={anItem.id}>
            <td>{anItem.id}</td>
            <td>{anItem.summaryId}</td>
            <td>{anItem.description}</td>
            <td>{anItem.unitCost}</td>
        </tr>
    ) )
}

export var ItemList = React.createClass( {

    render : function() {

        if ( this.props.ItemResponse == null) {
            return (
                <div>
                    <h4>Query criteria specified no results.</h4>
                    <AddItem Mode={this.props.Mode} doneWithAdding={this.props.DoneWithAdding}/>
                </div>
            )
        } else {
            return (
                <div >
                    <table  className="propertyForm">
                        <tbody>
                        {ItemLister(this.props.ItemResponse)}
                        </tbody>
                    </table>
                    <AddItem Mode={this.props.Mode} doneWithAdding={this.props.DoneWithAdding}/>
                </div>
            );
        }
    } }
)

export default ItemList;
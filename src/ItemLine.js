/**
 * Created by osboxes on 17/07/17.
 */
import React from "react";
import AddItem from "./AddItem.js";


class ItemLine extends React.Component {
    constructor( props, context ) {
        super( props, context );
        this.handleFlipSelect = this.handleFlipSelect.bind(this);
    }

    handleFlipSelect( e ) {
        let trLine = e.target;
        trLine = trLine.parentNode;
        if ( trLine.className === 'unSelected' ) {
            trLine.addClass( "selected");
            trLine.removeClass( "unSelected");
        } else {
            this.selectClass = 'selected';
        }
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

        for (let i = 0; i < itemResponse.data.length; i++) {
            let anItem = itemResponse.data[i];
            if (typeof anItem.selectClass === 'undefined') {
                anItem.selectClass = 'unSelected';
            }
        }

        return (
            itemResponse.data.map((anItem) =>
                <tr key={anItem.id} itemInQuestion={anItem.id} className={anItem.selectClass} onClick={this.handleFlipSelect}>
                    <td className="cellNumeric">{anItem.id}</td>
                    <td className="cellText">{anItem.summaryId}</td>
                    <td className="cellText">{anItem.description}</td>
                    <td className="cellNumeric">{anItem.unitCost}</td>
                </tr>
            ) )
    }

    render() {
        return (
            <tr key={anItem.id} itemInQuestion={anItem.id} className={anItem.selectClass} onClick={this.handleFlipSelect}>
                <td className="cellNumeric">{anItem.id}</td>
                <td className="cellText">{anItem.summaryId}</td>
                <td className="cellText">{anItem.description}</td>
                <td className="cellNumeric">{anItem.unitCost}</td>
            </tr>

            );
        }
    }

}

ItemLine.propTypes = {
    item: React.PropTypes.object.isRequired,
    selectState : React.PropTypes.bool.isRequired,
    setSelectState: React.PropTypes.func.isRequired
}

export default ItemList;


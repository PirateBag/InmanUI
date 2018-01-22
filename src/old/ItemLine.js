/**
 * Created by osboxes on 17/07/17.
 */
import React from "react";

class ItemLine extends React.Component {
    constructor( props, context ) {
        super( props, context );

        this.state = { isSelected : this.props.isSelected };

        this.handleFlipSelect = this.handleFlipSelect.bind(this);
    }

    handleFlipSelect( e ) {
        if (this.state.isSelected) {
            this.setState({isSelected: !this.state.isSelected});
        }
    }



    render() {
        var selectionClass = "unSelected";
        if ( this.state.isSelected ) {
            selectionClass = "selected";
        }

        return (
            <tr key={this.props.item.id} className={selectionClass} onClick={this.handleFlipSelect}>
                <td className="cellNumeric">{this.props.item.id}</td>
                <td className="cellText">{this.props.item.summaryId}</td>
                <td className="cellText">{this.props.item.description}</td>
                <td className="cellNumeric">{this.props.item.unitCost}</td>
            </tr>

            );
        }
    }

ItemLine.propTypes = {
    item: React.PropTypes.object.isRequired,
    isSelected : React.PropTypes.bool.isRequired,
    setSelectState: React.PropTypes.func.isRequired
}

export default ItemLine;


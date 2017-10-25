
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class DeleteModal extends Component  {

    constructor(props) {
        super(props)

        this.handleClose  = this.handleClose.bind( this );
    };

    handleClose(evt) {
        this.props.closeCallBack();
    }


    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        let itemsRemaining = this.props.itemsToDeleteRemaining;
        if ( itemsRemaining <= 0 ) {
            itemsRemaining = "All items have been deleted.";
        } else {
            itemsRemaining += " items have been deleted";
        }

        return (

          <Dialog
                  title={"Deleting Items"}
                  actions={actions}
                  open={true}
                  onRequestClose={this.handleClose} >
              {itemsRemaining} have been deleted
          </Dialog>
          );
    }
}

DeleteModal.propTypes = {
    itemsToDeleteRemaining : PropTypes.number.isRequired,
    closeCallBack : PropTypes.func.isRequired
}

export default DeleteModal;


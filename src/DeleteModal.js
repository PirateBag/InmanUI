
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
                label="Continue"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        let itemsRemaining = "All items have been deleted.";
        if ( this.props.countOfItemsDeleted  > 0 ) {
            itemsRemaining = this.props.countOfItemsDeleted + " row has been deleted";
        }

        return (
          <Dialog
                  title={"Delete status"}
                  actions={actions}
                  open={true}
                  onRequestClose={this.handleClose} >
            {itemsRemaining}
          </Dialog>
          );
    }
}

DeleteModal.propTypes = {
    countOfItemsDeleted : PropTypes.number.isRequired,
    closeCallBack : PropTypes.func.isRequired
}

export default DeleteModal;


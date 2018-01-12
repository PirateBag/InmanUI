
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Rule from './metadata/Rule.js'

export class MetadataUnitTests extends Component  {

    constructor(props) {
        super(props)

        this.state = { value : "lie in state" };

        this.handleClose  = this.handleClose.bind( this );
        this.handleChange  = this.handleChange.bind( this );
    };

    handleClose(evt) {
        this.props.closeCallBack();
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];


        let lowNumericRule = new Rule(
            { isAnumber : true,
                min : 0, errorMessage : "outof bounds", successMessage : "Success" } );
        let highNumericRule = new Rule(
            { isAnumber : true,
                max : 10, errorMessage : "outof bounds", successMessage : "Success" } );
        let rangeNumericRule = new Rule(
            { isAnumber : true, min: 5,
                max : 10, errorMessage : "outof bounds", successMessage : "Success" } );

        let lowAlphaRule = new Rule(
            {
                min : "B", errorMessage : "outof bounds", successMessage : "Success" } );
        let highAlphaRule = new Rule(
            { isAnumber : false,
                max : "M", errorMessage : "outof bounds", successMessage : "Success" } );
        let rangeAlphaRule = new Rule(
            {  min: "C",
                max : "F", errorMessage : "outof bounds", successMessage : "Success" } );



        return (

            <Dialog
                title={"Deleting Items"}
                actions={actions}
                open={true}
                onRequestClose={this.handleClose} >

                LowRule with 0 {lowNumericRule.validate( {value : 0 } )} <br/>
                LowRule with -1 {lowNumericRule.validate({value : -1 } )} <br/>
                LowRule with abc {lowNumericRule.validate({value : 'abc'} )} <br/>

                HighRule with  5 {highNumericRule.validate({value : 5} )} <br/>
                HighRule with 16 {highNumericRule.validate({value : 16} )} <br/>

                RangeRule with  2 {rangeNumericRule.validate({value :  2} )} <br/>
                RangeRule with  7 {rangeNumericRule.validate({value :  7} )} <br/>
                RangeRule with 20 {rangeNumericRule.validate({value : 20} )} <br/>

                LowAlphaRule with "B" {lowAlphaRule.validate( {value : "B" } )} <br/>
                LowAlphaRule with "A" {lowAlphaRule.validate({value : "A" } )} <br/>
                LowAlphaRule with "Z" {lowAlphaRule.validate( {value : "B" } )} <br/>

                HighAlphaRule with  "B" {highAlphaRule.validate({value : "B"} )} <br/>
                HighAlphaRule with "NN" {highAlphaRule.validate({value : "NN"} )} <br/>

                RangeAlphaRule with  "A" {rangeAlphaRule.validate({value :  "A"} )} <br/>
                RangeAlphaRule with  "D" {rangeAlphaRule.validate({value :  "D"} )} <br/>
                RangeAlphaRule with "K" {rangeAlphaRule.validate({value : "K"} )} <br/>

                <TextField value={this.state.value}
                           onChange={this.handleChange}/>

            </Dialog>
        );
    }
}

MetadataUnitTests.propTypes = {
    closeCallBack : PropTypes.func.isRequired
}

export default MetadataUnitTests;


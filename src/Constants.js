/**
 * Created by osboxes on 12/06/17.
 */

/*  export const INMAN_SERVER_IP = "http://localhost";  */
export const INMAN_SERVER_IP = "http://localhost";

export const IPPORT = ":8080";
export const NO_TOKEN  = "No Token";
export const NO_STATUS  = "off line.";
export const NO_MESSAGE  = "Please login.";

export const SERVER_REQUEST_TYPE_ITEM_QUERY = "item/query?";
export const SERVER_REQUEST_TYPE_ITEM_DELETE = "item/delete?";
export const SERVER_REQUEST_TYPE_ITEM_ADD = "item/add?";
export const SERVER_REQUEST_TYPE_ITEM_UPDATE = "item/update?";

export const fetchParameters = {
        method: 'GET',
        mode: 'cors' };
export const postParameters = {
    method: 'POST',
    mode: 'cors' };

export const NoCredentials = {
    status : NO_STATUS,
    message : NO_MESSAGE,
    token : NO_TOKEN
};

/*  The spelling of these tags should match the response from the server.  */
export const NoItem = {
    id: '',
    summaryId : '',
    description: '',
    unitCost: ''
}

export const iconStyles = {
    smallIcon: {
        width: 16,
        height: 16,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    small: {
        width: 32,
        height: 32,
        padding: 6,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
};

/*
import {red500, yellow500, blue500, greenA200} from 'material-ui/styles/colors'
*/
export const tableRowHeightStyle       = { border: "1px", height: "12px", padding: "1px"};
export const tableRowHeightStyleRight  = { border: "1px", height: "12px", padding: "1px", textAlign: "right" };
export const tableRowHeightStyleLeft  =  { border: "1px", height: "12px", padding: "1px", textAlign: "left" };
export const zDepth = 3;
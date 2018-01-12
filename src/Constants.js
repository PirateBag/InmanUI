/**
 * Created by osboxes on 12/06/17.
 */

export const INMAN_SERVER_IP = "http://10.1.21.97";
export const IPPORT = ":8080";
export const NO_TOKEN  = "No Token";
export const NO_STATUS  = "off line.";
export const NO_MESSAGE  = "Please login.";

export const SERVER_REQUEST_TYPE_ITEM_QUERY = "item/query?";
export const SERVER_REQUEST_TYPE_ITEM_DELETE = "item/delete?";
export const SERVER_REQUEST_TYPE_ITEM_ADD = "item/add?";

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

export const tableRowHeightStyle       = { border: "0px", height: "12px", padding: "1px"};
export const tableRowHeightStyleRight  = { border: "0px", height: "12px", paddingRight: "20px", textAlign: "right" };
export const zDepth = 2;
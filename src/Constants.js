/**
 * Created by osboxes on 12/06/17.
 */

export const INMAN_SERVER_IP = "http://10.1.21.86";
export const NO_TOKEN  = "No Token";
export const NO_STATUS  = "off line.";
export const NO_MESSAGE  = "Please login.";
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

export const NoItem = {
    id: 0,
    SummaryId : '',
    description: '',
    unitCost: 0.0
}
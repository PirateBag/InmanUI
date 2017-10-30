/**
 * Accepts an array of objects, with a unique key of "id".
 * Returns a copy of the array with the item missing.
 * If the item is not found, then a copy of the input is returned.
 *
 */
export function removeById( itemArray, item ) {
    let rValue = itemArray.filter( e => e.id !== item.id );
    return rValue;

}

function compareItems( a, b ) {
    if ( a.id < b.id ) {
        return -1;
    }
    if ( a.id > b.id ) {
        return 1;
    }
    return 0;
}

export function addById( itemArray, item ) {
    let rValue = itemArray;
    rValue.push( item );
    rValue.sort( compareItems )
    return rValue;
}

export function formatNumber( aNumber ) {
    return ( aNumber );
}
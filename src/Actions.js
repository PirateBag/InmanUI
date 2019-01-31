export const SERVER_AVAILABILITY_CHANGE = 'SERVER_AVAILABILITY_CHANGE';
export const CURRENT_USER_CHANGE = 'CURRENT_USER';

export function serverAvailabilityStateChange( newState ) {
  return {
    type: SERVER_AVAILABILITY_CHANGE,
    availabilityState : newState
  }
}

export function currentUserStateChange( newUser ) {
  return {
    type: CURRENT_USER_CHANGE,
    currentUser : newUser
  }
}
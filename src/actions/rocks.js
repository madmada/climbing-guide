import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'ROCKS_ERROR',
    data: message,
  })));
}

/**
  * Get Rocks
  */
export function getRocks() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('rocks')
    .on('value', (snapshot) => {
      const rocks = snapshot.val() || [];

      return resolve(dispatch({
        type: 'ROCKS_REPLACE',
        data: rocks,
      }));
    })).catch(e => console.log(e));
}

import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { addRockImage } from './storage';

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

/**
  * Add new rock to Firebase
  */
export function addNewRock(formData) {
  const {
    name,
    description,
    author,
    imageUrl,
  } = formData;
  let rockExists;

  const rockData = {
    name,
    description,
    author,
    ratingsum: 0,
    votes: 0,
    imageUrl,
    date: Firebase.database.ServerValue.TIMESTAMP,
  };

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!name) return reject({ message: ErrorMessages.missingRockName });
    if (!description) return reject({ message: ErrorMessages.missingDescription });
    if (!author) return reject({ message: ErrorMessages.authorizeProblem });
    if (!imageUrl) return reject({ message: ErrorMessages.missingImage });

    const newRockKey = FirebaseRef.child('rocks').push().key;
    rockData.id = newRockKey;

    // await addRockImage(image, newRockKey);

    await FirebaseRef.child('rocks').orderByChild('name').equalTo(name).once('value', (snapshot) => {
      if (snapshot.exists()) {
        rockExists = true;
      } else {
        rockExists = false;
      }
    });
    if (rockExists) return reject({ message: ErrorMessages.rockExists });

    await statusMessage(dispatch, 'loading', true);

    return FirebaseRef.child(`rocks/${newRockKey}`).set(rockData)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve)).then(console.log('new rock added'));
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

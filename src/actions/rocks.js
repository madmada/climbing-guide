
import _ from 'lodash';
import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';

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
export function getAllRocks() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('rocks').orderByChild('name')
    .on('value', (snapshot) => {
      const rocks = snapshot.val() || [];

      return resolve(dispatch({
        type: 'ROCKS_REPLACE',
        data: rocks,
      }));
    })).catch(e => console.log(e));
}

// export function getRocksByName() {
//   if (Firebase === null) return () => new Promise(resolve => resolve());

//   return dispatch => new Promise(resolve => FirebaseRef.child('rocks').orderByChild('name').startAt('B').endAt('B\uf8ff')
//     .on('value', (snapshot) => {
//       const rocks = snapshot.val() || [];

//       return resolve(dispatch({
//         type: 'ROCKS_REPLACE',
//         data: rocks,
//       }));
//     })).catch(e => console.log(e));
// }

/**
  * Add new rock to Firebase
  */
export function addNewRock(formData) {
  const {
    name,
    description,
    author,
    rockType,
    imageUrl,
    location,
    routes,
  } = formData;
  let rockExists;
  let emptyInput = [];
  let routeIndex;

  const rockData = {
    name,
    description,
    author,
    rockType,
    ratingsum: 0,
    votes: 0,
    imageUrl,
    date: Firebase.database.ServerValue.TIMESTAMP,
    location: {
      region: location.region,
      adress: location.address,
      gps: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    },
    routes: routes,
  };

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!name) return reject({ message: ErrorMessages.missingRockName });
    if (!description) return reject({ message: ErrorMessages.missingDescription });
    if (!rockType) return reject({ message: ErrorMessages.missingRockType });
    if (!author) return reject({ message: ErrorMessages.authorizeProblem });
    if (!imageUrl) return reject({ message: ErrorMessages.missingImage });
    if (!location.region) return reject({ message: ErrorMessages.missingLocation });
    if (routes.length === 0) return reject({ message: ErrorMessages.missingRoutes });

    await new Promise((res) => {
      routes.slice(0).reverse().map((item, index) => {
        const tmp = [];
        const reverseIndex = routes.length - index;
        if (item.name === '') tmp.push(' nazwa');
        if (item.author === '') tmp.push(' autor');
        if (item.gradesum === '') tmp.push(' wycena');
        if (item.year === '') tmp.push(' rok');
        if (tmp.length > 0) {
          emptyInput = tmp;
          routeIndex = reverseIndex;
        }
        res();
      });
    });
    if (emptyInput.length > 0) return reject({ message: `Uzupełnij pole: ${emptyInput} w drodze nr: ${routeIndex}` });

    const newRockKey = _.kebabCase(rockData.name);
    rockData.id = newRockKey;

    await FirebaseRef.child('rocks').orderByChild('id').equalTo(newRockKey).once('value', (snapshot) => {
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

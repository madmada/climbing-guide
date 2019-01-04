
import _ from 'lodash';
import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { getRate } from '../helpers';


export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'ROCKS_ERROR',
    data: message,
  })));
}

export function getRocks() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('rocks').orderByChild('name')
    .on('value', (snapshot) => {
      const rocks = snapshot.val() || [];

      return resolve(dispatch({
        type: 'ROCKS_REPLACE',
        data: Object.values(rocks),
      }));
    })).catch(e => console.log(e));
}

export function updateRock(data) {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  const {
    index,
    gradesum,
    votes,
    rock,
    rating,
    author,
    comment,
  } = data;

  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return () => new Promise(resolve => resolve());

  const update = gradesum ? 'gradesum' : rating ? 'rating' : comment ? 'comment' : '';
  console.log(update);

  switch (update) {
    case 'gradesum':
      /* Add new grade to route */
      const routeData = rock.routes[index];
      routeData.gradesum = gradesum;
      routeData.votes = votes;
      if (typeof routeData.voters !== 'undefined' && routeData.voters.length > 0) {
        routeData.voters.push(UID);
      } else {
        routeData.voters = [];
        routeData.voters.push(UID);
      }
      return dispatch => new Promise(async (resolve) => {
        await statusMessage(dispatch, 'loading', true);
        return FirebaseRef.child(`rocks/${rock.id}/routes/${index}`).set(routeData)
          .then(() => statusMessage(dispatch, 'loading', false).then(resolve)).then(console.log('grade updated'));
      }).catch(async (err) => {
        await statusMessage(dispatch, 'loading', false);
        throw err.message;
      });
    case 'rating':
      /* Add new rate to rock */
      const rockData = rock;
      rockData.ratingsum = rating;
      rockData.votes = votes;
      if (typeof rockData.comments !== 'undefined' && rockData.voters.length > 0) {
        rockData.voters.push(UID);
      } else {
        rockData.voters = [];
        rockData.voters.push(UID);
      }
      return dispatch => new Promise(async (resolve) => {
        await statusMessage(dispatch, 'loading', true);
        return FirebaseRef.child(`rocks/${rock.id}`).set(rockData)
          .then(() => statusMessage(dispatch, 'loading', false).then(resolve)).then(console.log('rate updated'));
      }).catch(async (err) => {
        await statusMessage(dispatch, 'loading', false);
        throw err.message;
      });
    case 'comment':
      /* Add new comment to rock */
      const data = rock;
      const commentObj = { comment: comment, author: author }
      if (typeof data.comments !== 'undefined' && data.comments.length > 0) {
        data.comments.push(commentObj);
      } else {
        data.comments = [];
        data.comments.push(commentObj);
      }
      return dispatch => new Promise(async (resolve) => {
        await statusMessage(dispatch, 'loading', true);
        return FirebaseRef.child(`rocks/${rock.id}`).set(data)
          .then(() => statusMessage(dispatch, 'loading', false).then(resolve)).then(console.log('comments updated'));
      }).catch(async (err) => {
        await statusMessage(dispatch, 'loading', false);
        throw err.message;
      });
    default:
      console.log('Update failed');
      return () => new Promise(resolve => resolve());
  }
}

export function getFilteredRocks(data) {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  const {
    name,
    region,
    rockType,
    sortBy,
  } = data;

  let sortKey;
  let sortOrder;

  switch (sortBy) {
    case 'rate':
      sortKey = rock => getRate(rock.ratingsum, rock.votes);
      sortOrder = 'asc';
      break;
    case 'rate-desc':
      sortKey = rock => getRate(rock.ratingsum, rock.votes);
      sortOrder = 'desc';
      break;
    case 'date':
      sortKey = 'date';
      sortOrder = 'asc';
      break;
    case 'date-desc':
      sortKey = 'date';
      sortOrder = 'desc';
      break;
    case 'name':
      sortKey = 'name';
      sortOrder = 'asc';
      break;
    default:
      sortKey = 'name';
      sortOrder = 'asc';
      break;
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('rocks').orderByChild('name')
    .on('value', (snapshot) => {
      let rocks = snapshot.val() || [];
      rocks = _.orderBy(rocks, [sortKey], [sortOrder]);
      rocks = Object.values(rocks);
      if (name) rocks = rocks.filter(rock => rock.name === name);
      if (region) rocks = rocks.filter(rock => rock.location.region === region);
      if (rockType) rocks = rocks.filter(rock => rock.rockType === rockType);

      return resolve(dispatch({
        type: 'ROCKS_REPLACE',
        data: rocks,
      }));
    })).catch(e => console.log(e));
}

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

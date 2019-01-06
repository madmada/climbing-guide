/**
 * https://github.com/mcnamee/react-native-starter-kit
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.cleanUserData = functions.database.ref('/users/{userId}').onWrite((event) => {
  console.log('Making Full Name for UserID:', event.params.userId);

  const firstName = event.data._newData.firstName || '';
  const lastName = event.data._newData.lastName || '';

  const userData = {
    fullName: `${firstName} ${lastName}`,
  };

  if (event && event.data && event.data._data && !event.data._newData.role) {
    userData.role = 'user';
  }

  return event.data.ref.update(userData);
});

exports.deleteUserData = functions.auth.user().onDelete((event) => {
  const uid = event.data.uid;
  return admin.database().ref(`/users/${uid}`).remove();
});

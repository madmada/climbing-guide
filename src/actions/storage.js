import { Firebase, FirebaseRef } from '../lib/firebase';
import ErrorMessages from '../constants/errors';

const storageRef = Firebase.storage().ref();

export function addRockImage(selectedFile) {
  let url;
  // generate unique key for image
  const { key } = FirebaseRef.child('rocks').push();
  const imagesRef = storageRef.child(`rocks/${key}/${selectedFile.name}`);

  return () => new Promise(async (resolve, reject) => {
    // check if image with that name exist in database
    const imageExists = await imagesRef.getDownloadURL().then(() => true).catch(() => false);
    if (imageExists) return reject({ message: ErrorMessages.rockImageExists });

    const uploadTask = imagesRef.put(selectedFile);

    return uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, (error) => {
      console.log(error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        url = downloadURL;
        console.log('File available at', url);
      }).then(() => resolve(url));
    });
  }).catch(async (err) => {
    throw err.message;
  });
}

export function geRockImageUrl() { }

require('dotenv').config()

const firebase = require('firebase')
const db = firebase
  .initializeApp({
    apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain,
    databaseURL: process.env.FIREBASE_databaseURL,
    projectId: process.env.FIREBASE_propjectId,
    storageBucket: '',
    messagingSenderId: process.env.FIREBASE_messagingSenderId
  })
  .firestore()

module.exports = database = async () => {
  db.collection('users')
    .doc('monika')
    .set({
      test: 'test'
    })

  return
}

// db.collection('users')
// .doc('folkert')
// .set({
//   test: 'test'
// })

// let doc = await db
// .collection('users')
// .doc('folkert')
// .get()

// if (doc.exists) {
// console.log(doc.data())
// }

// let test = await db.collection('users').get()
// //console.log(test.data())
// const log = test.docs.map(doc => doc.data())
// console.log(log)

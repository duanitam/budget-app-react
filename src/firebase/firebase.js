import  * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


// Initialize the data base
firebase.initializeApp(firebaseConfig);

const database = firebase.database();


// database.ref('expenses')
//     .on('child_removed', (snapshot) => {
//         console.log('Deleted', snapshot.key, snapshot.val())
//     });
// database.ref('expenses')
//     .on('child_changed', (snapchot) => {
//         console.log('Expense changed: ',snapchot.key, snapchot.val())
//     })
// database.ref('expenses')
//     .on('child_added', (snapchot) => {
//         console.log('Child added: ',snapchot.key, snapchot.val())
//     })
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         });
//         console.log(expenses);
//     });
//
//
// database.ref('expenses').on( 'value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach( child => {
//         expenses.push({
//             id: child.key,
//             ...child
//         })
//     })
//     console.log(expenses)
// });
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());}, (e) => {
//     console.log('Error with data fetching', e)
// });
//
// const getUserData = database.ref().on('value', (snapshot) => {
//     const {name, job} = snapshot.val();
//     console.log(`${name} is a ${job.title} at ${job.company}`)
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching', e)
// });
//
//
//
// database.ref('location')
//     .once('value')
//     .then((snapshot) => console.log(snapshot.val()) )
//     .catch((e)=>{console.log(e)})
//
//
//
//
// database.ref().set({
//     name:'Tamir',
//     age: 28,
//     stressLevel: 8,
//     job:{
//         title: 'Software developer',
//         company: 'Google'
//     },
//     isSingle: false,
//     location:{
//         city:'Berlin',
//         street: 'Strausberger platz 6'
//     }
// }).then(()=>{
//     console.log('Data is saved');}).catch( (e) => {
//     console.log(e);});
//
// database.ref('age').set(29);
// database.ref('location/city').set('NewYork');
//
// database.ref('attribute').set({
//     height: 175,
//     weight: 78
// }).then(
//     ()=>{
//         console.log('Attributes: height and weight written in database');
//     }
// ).catch(() => {
//     console.log('Could not write in database')
// });
// database.ref('isSingle').remove().
// then(()=>{console.log('Single attribute removed')}).
// catch((e)=>e);
//
// database.ref().update({name: 'Tamir Duani', age:100, 'location/city':'Beer Sheva'}).
// then(()=>{console.log('Object Updated')}).
// catch((e)=>{ console.log('Could not update: ',e)});
//
// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// }).then(()=>{console.log('Object Updated')}).
// catch((e)=>{ console.log('Could not update: ',e)});

export { firebase, database as default };
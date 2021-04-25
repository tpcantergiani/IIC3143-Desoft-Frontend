import React, { Component } from 'react';
// import * as firebase from 'firebase'

import firebase from 'firebase';

// import { dataURLtoFile } from '../utils';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };
// const firebaseConfig = {
//   apiKey: 'AIzaSyCV7g-Z7SLoJHfZe2_wA-bi-Jn0wAuurdI',
//   authDomain: 'reguard-desoft.firebaseapp.com',
//   projectId: 'reguard-desoft',
//   storageBucket: 'reguard-desoft.appspot.com',
//   messagingSenderId: '1026451438412',
//   appId: '1:1026451438412:web:a01bb50ab7611010436de9',
//   measurementId: 'G-LFRM84R26W',
// };

// // export default firebaseConfig;

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // firebase.analytics();
// const storage = firebase.storage();

// class FileUpload extends Component {
//   constructor() {
//     super();
//     this.state = {
//       // uploadValue: 0,
//     };
//   }

//   static getDerivedStateFromProps() {
//     return { uploadValue: 0 };
//   }

//   // handleOnChange = this.handleOnChange.bind(this);

//   handleOnChange(e) {
//     const file = e.target.files[0];
//     const storageRef = firebase.storage().ref(`pictures/${file.name}`);
//     const task = storageRef.put(file);

//     task.on('state_changed', (snapshot) => {
//       const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       this.setState({
//         uploadValue: percentage,
//       });
//     }, (error) => {
//       console.error(error.message);
//     }, () => {
//       // Upload complete
//       this.setState({
//         picture: task.snapshot.getdownloadURL,
//       });
//     });
//   }

//   render() {
//     const { uploadValue } = this.state;
//     const { picture } = this.state;
//     return (
//       <div>
//         <progress value={uploadValue} max="100">
//           {uploadValue}
//           %
//         </progress>
//         <br />
//         <input type="file" onChange={this.handleOnChange.bind(this)} />
//         <br />
//         <img width="90" alt="foto va aca" src={picture} />
//       </div>
//     );
//   }
// }

// export default FileUpload;
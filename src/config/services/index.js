import * as firebase from "firebase";

export const initialize = () => firebase.initializeApp({
    apiKey: "AIzaSyANEsA6hCT8rsa3fmkZVKzEQNNYPHlHz1U",
    authDomain: "chat-3f808.firebaseapp.com",
    databaseURL: "https://chat-3f808.firebaseio.com",
    projectId: "chat-3f808",
    storageBucket: "chat-3f808.appspot.com",
    messagingSenderId: "590855981383",
    appId: "1:590855981383:web:0cac145d2668d54f7fe462",
    measurementId: "G-88RW8HV92P"

});
firebase.initializeApp(firebaseConfig);
firebase.analytics();
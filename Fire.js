import firebase from 'firebase';


class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyANEsA6hCT8rsa3fmkZVKzEQNNYPHlHz1U",
                authDomain: "chat-3f808.firebaseapp.com",
                databaseURL: "https://chat-3f808.firebaseio.com",
                projectId: "chat-3f808",
                storageBucket: "chat-3f808.appspot.com",
                messagingSenderId: "590855981383",
                appId: "1:590855981383:web:0cac145d2668d54f7fe462",
                measurementId: "G-88RW8HV92P"

            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {

            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();
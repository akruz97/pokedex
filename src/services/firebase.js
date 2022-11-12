import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'


export const pushData = async (ref, data) => new Promise((resolve, reject) => {
    database()
    .ref(ref)
    .push(data)
    .then(() => resolve("OK"))
    .catch((error) => reject(error.message));
});

export const setData = async (ref, data) => new Promise((resolve, reject) => {
    database()
    .ref(ref)
    .set(data)
    .then(() => resolve("OK"))
    .catch((error) => reject(error.message));
});

export const getCollection = async (ref, callback) => new Promise((resolve, reject) => {
    let result = [];
    database()
    .ref(ref)
    .on('value', snapshot => {
        snapshot.forEach(element => {
            const id = element.key;
            const val = element.val();
            let obj = { id, ...val }
            result.push(obj);
        });
        callback(result);
        resolve(result);
    });
});
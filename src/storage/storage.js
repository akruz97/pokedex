import AsyncStorage from '@react-native-async-storage/async-storage';
import { reportCrash } from '../services';

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      reportCrash(e);
    }
  }

 export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      reportCrash(e);
    }
  }

export const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch(e) {
        reportCrash(e);
    }
  
    console.log('Done.')
  }
  
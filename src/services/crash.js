import crashlytics from '@react-native-firebase/crashlytics';

export const reportCrash = (error) => {
    crashlytics().recordError(error)
}


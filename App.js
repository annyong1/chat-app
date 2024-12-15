import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBKPMJirP45PBUxW0-nGJnFniTsEXlv0sY",
  authDomain: "chat-app-db-59d7d.firebaseapp.com",
  projectId: "chat-app-db-59d7d",
  storageBucket: "chat-app-db-59d7d.firebasestorage.app",
  messagingSenderId: "755687679752",
  appId: "1:755687679752:web:be17188735ace1ea9beebd",
  measurementId: "G-7L8QECQ8CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
          initialParam={{ db: db }}
        />
        <Stack.Screen
          name="Chat">
          {(props) => <Chat db={db} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>  
    </NavigationContainer>
  );
}

export default App;
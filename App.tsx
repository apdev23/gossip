import React, { useEffect } from 'react';
import 'react-native-reanimated';
import MainNavigation from './src/navigation/MainNavigation';
import BootSplash from "react-native-bootsplash";
import { firebase } from '@react-native-firebase/firestore';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  const firebaseConfig = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_AUTH_DOMAIN,
    projectId: "gossip-158fb",
    databaseURL: "https://gossip-158fb.firebaseio.com",
    storageBucket: "gossip-158fb.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "1:539741403756:android:4fb05de107c40b151df649",
  };

  if (!firebase?.apps?.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;

// import { FieldValue } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestore';
import auth from '@react-native-firebase/auth';
import firestore, { FieldValue } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import {AppState} from 'react-native'
import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import { AppState } from 'react-native';

import {
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk-next';

export const AuthContext =
  createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(!user?.uid) {
      return;
    }

    const userRef = firestore()
      .collection('users')
      .doc(user.uid);

    userRef.update({
      isOnline:true,
      lastSeen: firestore.FieldValue.serverTimestamp()
    })

    const subcription = AppState.addEventListener('change',
      async nextAppState => {
        if(nextAppState === 'active') {
          await userRef.update({ isOnline:true })
        } else {
          await userRef.update({ isOnline:false, lastSeen : firestore.FieldValue.serverTimestamp()})
        }
      }
    ) 

    return () => {
      userRef.update({ 
        isOnline:false, lastSeen : firestore.FieldValue.serverTimestamp()
      })

      subcription.remove()
    }

    // const unsubscribe =
    //   auth().onAuthStateChanged(
    //     user => {

    //       setUser(user);

    //       if (loading) {
    //         setLoading(false);
    //       }
    //     },
    //   );

    // return unsubscribe;

  }, [user]);

  // LOGIN

  const login = async (email,password) => {

    try {

      const userCredential =
        await auth()
          .signInWithEmailAndPassword(
            email,
            password,
          );

      const user =
        userCredential.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,

          name:user.displayName ||'No Name',

          email: user.email,

          image:user.photoURL || '',
          isOnline : true,
          lastSeen:FieldValue.serverTimestamp()
        });

    } catch (e) {
      alert(e.message);
    }
  };

  // REGISTER

  const register = async (name,email,password) => {

    try {

      const userCredential =
        await auth()
          .createUserWithEmailAndPassword(email,password);

      const user = userCredential.user;

      await user.updateProfile({displayName: name});


      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,

          name: name,

          email: user.email,

          image:
            user.photoURL || '',
          isOnline : true,
          lastSeen:FieldValue.serverTimestamp()
        });

    } catch (e) {
      alert(e.message);
    }
  };



  const logout = async () => {

    try {

      await auth().signOut();

    } catch (e) {
      alert(e.message);
    }
  };

  // GOOGLE 

  const googleLogin = async () => {

    try {

      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signOut();

      const userInfo =
        await GoogleSignin.signIn();

      const idToken =
        userInfo?.data?.idToken ||
        userInfo?.idToken;

      if (!idToken) {
        throw new Error(
          'No ID token found',
        );
      }

      const googleCredential =
        auth.GoogleAuthProvider.credential(idToken);

      const userCredential =
        await auth()
          .signInWithCredential(
            googleCredential,
          );

      const user =
        userCredential.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,

          name:
            user.displayName ||
            'No Name',

          email: user.email,

          image:
            user.photoURL || '',
          isOnline : true,
          lastSeen:FieldValue.serverTimestamp()
        });

    } catch (err) {
      console.log(
        'GOOGLE ERROR:',
        err,
      );
    }
  };

  // FACEBOOK LOGIN

  const fbLogin = async () => {

    try {

      const result =
        await LoginManager
          .logInWithPermissions([
            'public_profile',
            'email',
          ]);

      if (result.isCancelled) {
        return;
      }

      const data =
        await AccessToken
          .getCurrentAccessToken();

      if (!data) {
        throw new Error(
          'Something went wrong',
        );
      }

      const facebookCredential =
        auth.FacebookAuthProvider.credential(
          data.accessToken,
        );

      const userCredential =
        await auth()
          .signInWithCredential(
            facebookCredential,
          );

      const user =
        userCredential.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,

          name:
            user.displayName ||
            'No Name',

          email: user.email,

          image:
            user.photoURL || '',
          isOnline : true,
          lastSeen:FieldValue.serverTimestamp()
        });

    } catch (err) {

      console.log(
        'FB LOGIN ERROR:',
        err,
      );
    }
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        googleLogin,
        fbLogin,
      }}>

      {children}

    </AuthContext.Provider>
  );
};
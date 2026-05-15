import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, useState, useEffect } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (loading) {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      const user = userCredential.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid:user.uid,
          name:user.displayName || 'no name',
          email:user.email,
          image:user.user.photoURL,
        })

    } catch (e) {
      alert(e.message);
    }
  };

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid:user.uid,
          name:user.displayName,
          email:user.email,
          image:user.user.photoURL,
        })

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

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      // force account picker
      await GoogleSignin.signOut();

      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);

      const idToken = userInfo?.data?.idToken || userInfo?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('GOOGLE ERROR:', err);
    }
  };

  const fbLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('User cancelled the login process');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      const userCredential = await auth().signInWithCredential(
        facebookCredential,
      );

      console.log('FB LOGIN SUCCESS', userCredential);
    } catch (err) {
      console.log('FB LOGIN ERROR:', err);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

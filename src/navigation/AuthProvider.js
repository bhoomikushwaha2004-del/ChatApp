import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, useState, useEffect } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

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
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

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

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      alert(e.message);
    }
  };

  const fbLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
    }
    catch(err){
      console.log(err);
      
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        googleLogin,
        fbLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

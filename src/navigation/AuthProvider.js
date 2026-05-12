import auth from '@react-native-firebase/auth';
import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

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

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      alert(e.message);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

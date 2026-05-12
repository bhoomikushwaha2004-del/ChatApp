import auth from '@react-native-firebase/auth'
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({childern}) => {
    const [ user, setUser] = useState(null);

    return (
        <AuthProvider.Provider
        value={{
            user,
            setUser,
            login: async(email,password) => {
                try {
                    await auth().signInWithEmailAndPassword(email,password)
                }
                catch(e){
                    console.log(e);
                    
                }
            },
            register: async(email,password) => {
                try {
                    await auth().createUserWithEmailAndPassword(email,password)
                }
                catch(e){
                    console.log(e);
                    
                }
            },
            logout: async () => {
                try {
                    await auth().signOut()
                }
                catch(e) {
                    console.log(e);
                    
                }
            }
        }}
        >{childern} </AuthProvider.Provider>
    )
}
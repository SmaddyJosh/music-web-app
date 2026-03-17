import React, {createContext, useContext, useState} from "react";

interface User {
    name: string;
    email: string;
    isPremium: boolean;
}

interface AuthContextType{
    user: User | null;
    login: (email:string) => void;
    logout: () => void;
}

const AuthContext =createContext<AuthContextType |undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = ( email: string) => {
        setUser({name:email.split('@')[0], email, isPremium: true});
    };

    const logout = () =>{
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
    
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


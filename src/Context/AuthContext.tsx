import React, {createContext, useContext, useState} from "react";

interface User {
    name: string;
    email: string;
    isPremium: boolean;
}

interface AuthContextType{
    user: User | null;
    login: (email:string, password: string) => Promise <any>;
    register: (email:string, password: string) => Promise <any>;
    logout: () => void;
}

const AuthContext =createContext<AuthContextType |undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async( email: string, password: string) => {
      try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        
        setUser(data.user);
        return { success: true };
      } else {
        // Failed login
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error("Login failed", err);
      return { success: false, error: "Network error. Is the server running?" };
    };
    };

    const logout = () =>{
        setUser(null);
    };
    const register = async (email: string , password: string) => {
        try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) return { success: true };
      return { success: false, error: data.error || 'Registration failed' };
    } catch (err) {
      return { success: false, error: 'Network error. Is the server running?' };
    }
    };
    return(
        <AuthContext.Provider value={{user, login, logout,register}}>
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



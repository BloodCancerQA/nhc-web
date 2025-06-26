import React, { createContext, ReactNode } from 'react';
import userStore from '@/stores/UseStore';

const UserContext = createContext(userStore);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => (
    <UserContext.Provider value={userStore}>
        {children}
    </UserContext.Provider>
);

export { UserContext, UserProvider };

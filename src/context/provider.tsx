import React, { createContext, useContext, ReactNode, useMemo } from 'react';

export interface UserData {
    id?: string;
    email: string;
    name: string;
    role: string
}

interface ContextType {
    data: UserData | null;
    updateData: (newData: UserData | null) => void;
}

const UserContext = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

const defaultData = {
    email: "",
    id: "",
    name: '',
    role: ''
}

const UserProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [data, setData] = React.useState<UserData | null>(defaultData);

    const updateData = (newData: UserData | null) => {
        if (newData != undefined) {
            localStorage.setItem('userData', JSON.stringify(newData));
            setData(newData);
        }
    };

    const getUpdatedData: UserData = useMemo(() => {
        const getData: any = localStorage.getItem('userData')
        return JSON.parse(getData) || defaultData;
    }, [data])

    return (
        <UserContext.Provider value={{ data: getUpdatedData, updateData }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider };

// Custom hook to access the context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

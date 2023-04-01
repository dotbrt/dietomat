import { createContext, useState } from "react";

type DataContextType = {
    contextData: string;
    setData: (contextData: string) => void;
};

export const DataContext = createContext<DataContextType>({
    contextData: "",
    setData: () => { },
});

export const DataContextProvider: React.FC<any> = ({ children }: any) => {
    const [contextData, setData] = useState("");

    const value = {
        contextData,
        setData,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

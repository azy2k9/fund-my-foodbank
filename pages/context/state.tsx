import React from 'react';
import useSetState from '../../hooks/useSetState';

interface Context {
    appState: AppContextInterface;
    setAppState: (
        patch:
            | Partial<AppContextInterface>
            | ((prevState: AppContextInterface) => Partial<AppContextInterface>),
    ) => void;
}

interface AppContextInterface {
    foodbanks: Array<string>;
    donator_email: string;
    amount: number;
    donator_name: string;
}

const initialAppState: AppContextInterface = {
    foodbanks: [],
    donator_email: '',
    amount: 0,
    donator_name: '',
};

const AppContext = React.createContext<Context>({} as Context);

const AppContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [appState, setAppState] = useSetState<AppContextInterface>(initialAppState);

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };

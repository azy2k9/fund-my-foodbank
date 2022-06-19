import React, { useContext } from 'react';
import { AppContext } from '../pages/context/state';

const useAppState = () => {
    const { appState, setAppState } = useContext(AppContext);
    return { appState, setAppState };
};

export default useAppState;

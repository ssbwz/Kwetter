import React, { createContext, useContext, useState } from 'react';

// Create a Context
const GlobalStateContext = createContext();
const GlobalStateUpdateContext = createContext();

// Custom hooks for accessing the state and the updater
export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext);

// Provider component
export const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState({ /* initial state */ });

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalStateUpdateContext.Provider value={setState}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    );
};

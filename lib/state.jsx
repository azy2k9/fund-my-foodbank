import React, { useContext, useState } from 'react'


export const values = {
    something:true
}


export const AppContext = React.createContext({
    state: undefined,
    setContextState: async (state) => null,
})


export const useContextState = () => useContext(AppContext)


export const AppProvider = ({ children }) => {
    const [state, setContextState] = useState(values.something)


    return <AppContext.Provider value={{ state, setContextState }}>{children}</AppContext.Provider>
}
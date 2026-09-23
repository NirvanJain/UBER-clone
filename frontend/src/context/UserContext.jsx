import React, { createContext, useState } from 'react'

// Shared context for the currently logged-in rider profile.
export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    // Store the authenticated rider data so all screens can access their profile.
    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </>
    )
}

export default UserContext
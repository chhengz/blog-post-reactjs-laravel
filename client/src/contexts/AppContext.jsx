import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    async function getuser() {
        const res = await fetch("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        // console.log(data);

        if (res.ok) {
            setUser(data);
        }
    }

    useEffect(() => {
        if (token) {
            getuser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}

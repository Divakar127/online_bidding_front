import { createContext, useContext } from "react";

export const AuthContext = createContext({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = AuthContext.Provider;

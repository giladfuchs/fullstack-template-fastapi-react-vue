export type AuthContextType = {
    isLoggedIn: boolean;
    isInitialized: boolean;
    logout: () => void;
    login: (id: string, phone: string) => Promise<void>;
};

export interface initialAuthContextProps {
    isLoggedIn: boolean;
    isInitialized: boolean;
}

export interface authReducerActionProps {
    type: string;
    payload?: { isLoggedIn: boolean };
}

export type AuthContextType = {
    isLoggedIn: boolean;
    isInitialized: boolean;
    logout: () => void;
    login: (id: string, phone: string) => Promise<void>;
};

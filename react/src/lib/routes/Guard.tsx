import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/contexts/UseAuth';
import { GuardProps } from '@/lib/types';
import { useEffect } from 'react';
import config from '@/lib/utils/config';

export const GuestGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(config.defaultPath, { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, isInitialized } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && isInitialized) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate, isInitialized]);

    return children;
};

import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '@/components/layout/Loadable';
import MainLayout from '@/components/layout/MainLayout';
import { GuestGuard, AuthGuard } from './Guard';

// ==============================|| GuestRoutes ||============================== //
const Login = Loadable(lazy(() => import('@/pages/Login')));
const MaintenanceError = Loadable(lazy(() => import('@/components/layout/Error')));
const Form = Loadable(lazy(() => import('@/components/form/Form')));

// ==============================|| AuthRoutes ||============================== //
const AGTable = Loadable(lazy(() => import('@/components/table/ag-grid/AGTable')));
const StudentView = Loadable(lazy(() => import('@/pages/StudentView')));

const GuestRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            index: true,
            element: <Navigate to="/login" replace />
        },
        {
            path: '*',
            element: <Navigate to="/error" replace />
        },
        {
            path: '/login',
            element: (
                <GuestGuard>
                    <Login />
                </GuestGuard>
            )
        },
        {
            path: '/error',
            element: <MaintenanceError />
        },
        {
            path: '/form/:model/:id',
            element: <Form />
        }
    ]
};

const AuthRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/view/:id',
            element: <StudentView />
        },
        {
            path: '/:model',
            element: <AGTable />
        }
    ]
};

export default function ThemeRoutes() {
    return useRoutes([GuestRoutes, AuthRoutes]);
}

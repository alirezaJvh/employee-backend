import { singup, singin } from "../controller/auth";

export const AppRoutes = [
    {
        path:'/auth/register',
        method: 'post',
        action: singup
    },
    {
        path: '/auth/login',
        method: 'post',
        action: singin
    }
]
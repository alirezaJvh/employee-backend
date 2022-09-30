import { register } from "../controller/auth";

export const AppRoutes = [
    {
        path:'/auth/register',
        method: 'post',
        action: register
    }
]
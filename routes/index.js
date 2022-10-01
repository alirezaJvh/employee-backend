import { singup, singin } from "../controller/auth";
import { getAllEmployees } from "../controller/employee";
import { verifyToken } from "../middleware/auth-jwt";

export const AppRoutes = [
    {
        path:'/auth/register',
        method: 'post',
        action: singup,
        middlewares: [],
    },
    {
        path: '/auth/login',
        method: 'post',
        action: singin,
        middlewares: [],
    },
    {
        path: '/employee',
        method: 'get',
        action: getAllEmployees,
        middlewares: [verifyToken],
    }
]
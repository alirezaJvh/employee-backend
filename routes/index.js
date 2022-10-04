import { singup, singin } from "../controller/auth";
import { getAllEmployees, addEmployees, editEmployee, deleteEmployee } from "../controller/employee";
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
    },
    {
        path:'/employee',
        method: 'post',
        action: addEmployees,
        middlewares: [verifyToken]
    },
    {
        path: '/employee',
        method: 'put',
        action: editEmployee,
        middlewares: [verifyToken],
    }, 
    {
        path: '/employee',
        method: 'delete',
        action: deleteEmployee,
        middlewares: [verifyToken],
    }
]
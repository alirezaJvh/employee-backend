import { singup, singin } from "../controller/auth";
import { getAllEmployees, addEmployees, editEmployee, deleteEmployee, getEmployee } from "../controller/employee";
import { createComment, getCommentsById } from '../controller/comment'
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
    },
    {   
        // get employee comments
        path: '/employee/:id/comments',
        method: 'get',
        action: getCommentsById,
        middlewares: [],
    },
    {
        // get employee info
        path: '/employee/:id',
        method: 'get',
        action: getEmployee,
        middlewares: [verifyToken],
    },
    {
        // create comment
        path: '/employee/:id/comments',
        method: 'post',
        action: createComment,
        middlewares: [verifyToken],
    }
]
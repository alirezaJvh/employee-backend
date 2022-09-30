import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { EmployeeModel } from '../models/employee'
import isEmail from 'validator/lib/isEmail';

const register = async (req, res) => {
    try {
        const error = await registerInputValidation(req.body)
        console.log(error)
        if (error.message) {
            res.status(error.status).send(error.message)
        } else {
            const employee = createEmployee(req.body)
            res.status(200).json({data: { employee }})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'Error',
            message: e.message,
        })
    }
}

const createEmployee = async ({username, password, firstName, lastName, email, address}) => {
    try {
        const encryptedPassword = await bcrypt.hash(password, 10)
        const employee = await EmployeeModel.create({
            username,
            email,
            firstName,
            lastName,
            address,
            role: 'Employee',
            password: encryptedPassword,
        })
        await employee.save()
        return employee
    } catch (e) {
        console.log('Error in saving employee')
        console.log(e.message)
    }
}

const registerInputValidation = async ({username, email, password, firstName, lastName}) => {
    const error = {status: '', message: ''}
    if (!(username && email && password && firstName && lastName)) {
        error.status = 400
        error.message = 'All input is requried'
    }
    console.log('is email', isEmail(email))
    if (isEmail(email)) {
        error.status = 400
        error.message = 'Email is not valid'
    }
    const oldEmployee = await EmployeeModel.findOne({ email })
    if (oldEmployee) {
        error.status = 409
        error.message = 'Employee already exists'
    }
    return error
}

export { register }
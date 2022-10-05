import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmployeeModel } from '../models/Employee'
import isEmail from 'validator/lib/isEmail';

const singup = async (req, res) => {
    try {
        console.log(req.body)
        const error = await registerInputValidation(req.body)
        if (error.message) {
            return res.status(error.status).json({ message: error.message })
        } 
        await createEmployee(req.body)
        return res.status(200).json({message: 'User created successfully'})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'Error',
            message: e.message,
        })
    }
}

const createEmployee = async (inputs) => {
    try {
        const encryptedPassword = await bcrypt.hash(inputs.password, 10)
        const employee = new EmployeeModel({
            ...inputs,
            password: encryptedPassword,
            role: 'EMPLOYEE'
        })
        await employee.save()
        return employee
    } catch (e) {
        console.log(e.message)
    }
}

const registerInputValidation = async ({username, email, password, firstName, lastName}) => {
    const error = {status: '', message: ''}
    if (!(username && email && password && firstName && lastName)) {
        error.status = 400
        error.message = 'All input is requried'
    }
    if (!isEmail(email)) {
        error.status = 400
        error.message = 'Email is not valid'
    }
    // username and email must be unique
    const oldEmployee = await EmployeeModel.findOne({$or: [{ email }, { username }] })
    if (oldEmployee) {
        error.status = 409
        error.message = 'Employee with this email and username already exists'
    }
    return error
}

const singin = async (req, res) => {
    const { username, password } = req.body
    try {
        const error = loginInputValidation(req.body)
        let { status, message } = error
        if (message) {
            return res.status(status).json({ message })
        }
        const employee = await EmployeeModel.findOne({ username })
        if (!employee) {
            [status, message] =[404, 'User not found!']
            return res.status(status).json({ message })
        }
        const comparePassword = await bcrypt.compare(password, employee.password) 
        if (employee && comparePassword) {
            const resultObj = creatResponseObj(employee)
            return res.status(200).json(resultObj)
        }
        [status, message] =[400, 'Invalid Credentials']
        return res.status(status).json({ message })
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
}

const loginInputValidation = ({username, password}) => {
    const error = {status: '', message: ''}
    if (!(username && password)) {
        error.status = 400
        error.message = 'All input is requried'
    }
    return error
}

const creatResponseObj = (employee) => {
    const token = jwt.sign(
        {
            id: employee._id,
            role: employee.role,
        },
        process.env.PRIVATE_KEY,
    )
    const {username, email, role, _id} = employee
    return {employee: { username, email, role, id: _id }, token}
}

export { singup, singin }
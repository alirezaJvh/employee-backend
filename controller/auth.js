import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmployeeModel } from '../models/employee'
import isEmail from 'validator/lib/isEmail';

const singup = async (req, res) => {
    try {
        const error = await registerInputValidation(req.body)
        if (error.message) {
            return res.status(error.status).send(error.message)
        } 
        const employee = await createEmployee(req.body)
        return res.status(200).send('User created successfully')
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
        if (error.message) {
            return res.status(error.status).send(error.message)
        }
        const employee = await EmployeeModel.findOne({ username })
        const comparePassword = await bcrypt.compare(password, employee.password) 
        if (employee && comparePassword) {
            const token = createToken(employee)
            employee.token = token
            return res.status(200).json({data: { token }})
        }
        return res.status(400).send('Invalid Credentials')
    } catch (e) {
        console.log(e)
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

const createToken = (employee) => {
    return jwt.sign(
        {
            id: employee._id,
            username: employee.username,
        },
        process.env.PRIVATE_KEY,
    )
}

export { singup, singin }
import { EmployeeModel } from '../models/Employee'
import bcrypt from 'bcrypt';

const getAllEmployees = async (req, res) => {
    try {
        const resultObj = await paginationEmployees(req.query)
        if (!resultObj) {
            return res.status(417).json({ message: 'Error in getting all employees'})
        }
        return res.status(200).json(resultObj)
    } catch (e) {

    }
}

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const employee = await EmployeeModel.findById(id)
        if (!employee) {
            return res.status(404).json({message: 'Employee not found!'})
        }
        return res.status(200).json(employee)

    } catch (e) {
        console.log(e)
        res.status(400)
    }
}

const addEmployees = async (req, res) => {
    try {
        const { body } = req
        const employees = await prepareInputObj(body)
        await EmployeeModel.insertMany(employees)
        return res.status(200).json({message: 'Users created successfully'})
    } catch (e) {
        console.log(e.errors)
        console.log(e.message)
        return res.status(400).json(e)
    }
}

const prepareInputObj = async(obj) => {
    return Promise.all(obj.map(async (item) => {
        const password = await bcrypt.hash(item.password, 10)
        return {...item, password}
    })).catch(err => {
        console.log('hash error')
        console.log(err)
    })
}

const paginationEmployees = async (query) => {
    const {limit, skip} = createPaginationParam(query)
    try {
        const [employeesArray, totalItems] =  await Promise.all([
            EmployeeModel
                        .find()
                        .limit(limit)
                        .skip(skip),
            EmployeeModel.count()
        ])
        const totalPages = Math.ceil(totalItems / limit)
        const currentPage = parseInt(query.page)
        const employees = employeesArray.map(({firstName, lastName, email, username, role, _id, address}) => {
            return {id: _id, firstName, lastName, email, username, role, address}
        })
        return { totalItems, employees, totalPages, currentPage }
    } catch (e) {
        console.log(e)
    }
}

const createPaginationParam = ({size, page}) => {
    if(!(size && page)) {
        return {
            limit: 10,
            skip: 0
        }
    }
    return {
        limit: size,
        skip: (page - 1) * size,
    }
}

const editEmployee = async (req, res) => {
    try {
        const { employeeRole } = req
        const { id, ...user } = req.body
        if (employeeRole !== 'ADMIN') {
            return res.status(401).json({message: 'Unauthorized action!'})
        }
        const result = await EmployeeModel.findByIdAndUpdate(id, user)
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { employeeRole } = req
        const { id, ...user } = req.body
        if(employeeRole !== 'ADMIN') {
            return res.status(401).json({message: 'Unauthorized action!'})
        }
        await EmployeeModel.findByIdAndDelete(id)
        res.status(200).json({message: 'User deleted successfully!'})
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

export { 
    getEmployee,
    getAllEmployees, 
    addEmployees,
    editEmployee,
    deleteEmployee,
}
import { EmployeeModel } from '../models/employee'
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

const addEmployees = async (req, res) => {
    try {
        const { body } = req
        const employees = await prepareInputObj(body)
        console.log(employees)
        await EmployeeModel.insertMany(employees)
        res.status(200).json({message: 'Users created successfully'})
    } catch (e) {
        console.log(e.errors)
        console.log(e.message)
        res.status(400).json(e)
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
        const employees = employeesArray.map(({firstName, lastName, email, username, role, _id}) => {
            return {firstName, lastName, email, username, role, id: _id}
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

export { getAllEmployees, addEmployees }
import { EmployeeModel } from '../models/employee'

const getAllEmployees = async (req, res) => {
    try {
        const resultObj = await paginationEmployees(req.query)
        if (!resultObj) {
            return res.status(417).send('error in getting all employees')
        }
        return res.status(200).json(resultObj)
    } catch (e) {

    }
}

const paginationEmployees = async (query) => {
    const {limit, skip} = createPaginationParam(query)
    try {
        const [employees, totalItems] =  await Promise.all([
            EmployeeModel
                        .find()
                        .limit(limit)
                        .skip(skip),
            EmployeeModel.count()
        ])
        const totalPages = Math.ceil(totalItems / limit)
        const currentPage = parseInt(query.page)
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

export { getAllEmployees }
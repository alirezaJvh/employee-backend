import { EmployeeModel } from '../models/employee'

const getAllEmployees = async (req, res) => {
    try {
        const employee = await EmployeeModel.find()
        return res.status(200).json({ data: { employee } })
    } catch (e) {

    }
}

export { getAllEmployees }
import { CommentModel } from '../models/Comment'
import { EmployeeModel } from '../models/Employee'

const createComment = async (req, res) => {
    try {
        const employeeId = req.params.id
        const { text, autherId } = req.body
        const [ auther, employee ] = await Promise.all([
            EmployeeModel.findById(autherId),
            EmployeeModel.findById(employeeId)
        ])
        if (!auther || !employee) {
            return res.status(401).json({message: 'Invalid auther or employee'})
        } 
        const comment = new CommentModel({body: text})
        comment.auther = auther
        comment.employee = employee
        const result = await comment.save()
        res.status(200).json(result)
    } catch (e) {
        return res.status(400)
    }
}

const getCommentsById = async (req, res) => {
    try {
        const { id } = req.params
        const comments = await CommentModel
                                        .find({employee: id})
                                        .populate('auther')
        return res.status(200).json(comments)
    } catch (e) {
        console.log(e)
        return res.status(400)
    }
}


export { createComment, getCommentsById }
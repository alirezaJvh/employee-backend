import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    }
})
employeeSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })
const EmployeeModel = mongoose.model('employee', employeeSchema)
export { EmployeeModel }

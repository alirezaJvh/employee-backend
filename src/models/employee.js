import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
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
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

const EmployeeModel = mongoose.model('employee', employeeSchema)
export { EmployeeModel }

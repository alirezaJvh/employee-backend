import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
    },
    auther: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employee' 
    },
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employee' 
    }
}, { timestamps: true })

const CommentModel = mongoose.model('comment', CommentSchema)
export { CommentModel }
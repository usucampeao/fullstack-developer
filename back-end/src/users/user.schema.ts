import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },    
    name: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isMaster: {
        type: Boolean,
        required: true,
        default: false
    },    
}, {
    collection: 'user',
});

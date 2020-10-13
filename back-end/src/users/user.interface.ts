import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    login: string;
    name: string;
    email: string;
    password: string;
    isMaster: boolean;
}

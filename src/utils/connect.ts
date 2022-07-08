import mongoose from 'mongoose';
import config from 'config';

const dbUri = config.get<string>('dbUri')

const connect = async () => {
    try {
        await mongoose.connect(dbUri)
        console.log('DB connected');
    } catch (error) {
        console.log(error)
        process.exit(1)
    }   
}

export default connect
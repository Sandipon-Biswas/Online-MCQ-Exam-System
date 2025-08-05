import {connect} from 'mongoose'
const connectToMongo = async()=>{
    try {
        await connect(process.env.MONGO_URL)
        console.log("database connected")
    } catch (error) {
        console.log(error);
    }
}
export default connectToMongo;
import config from "../config/index"
import {connect} from 'mongoose'
export const connectToMongo = () => {


    // config && config.databaseURL&& connect(config.databaseURL)
   connect("mongodb+srv://Hitesh:Hitesh@cluster0.bulhrac.mongodb.net/emailAiEndlos?retryWrites=true&w=majority")
      .then(() => console.log(" connected with db successfully"))
      .catch((error) => console.log(error.message,'myerror'));
}

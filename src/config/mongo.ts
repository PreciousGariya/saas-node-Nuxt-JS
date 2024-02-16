
const mongoose = require('mongoose');
require('dotenv').config();
 
const mongoDB = async () => {
    try {
        // mongodb+srv://vaibhavhestabit01:Tech@143@@serpcrunch.7d3lcuj.mongodb.net/?retryWrites=true&w=majority
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoCreate: false,        
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}
 
export {mongoDB};

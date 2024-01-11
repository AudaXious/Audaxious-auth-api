import sequelize from "./database.js";

export const connectToDatabase = async () => {
  try {
    
        //Testing database connection
        await sequelize.authenticate();
         console.log('Connection has been established successfully.');

        //
        await sequelize.sync();
        console.log('Database synchronized.');

  } catch (error) {
    console.log("Failed to connect to Database: ", error);
    process.exit(1);
  }
};

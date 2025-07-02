import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  if (!config.mongodbUri) {
    console.log("MongoDB uri is not specified");
    process.exit(1);
  }

  try {
    await mongoose.connect(config.mongodbUri).then(() => {
      console.log("Mongodb Connected successfully");
    });

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
}

main();

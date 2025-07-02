import mongoose from "mongoose";
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
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
}

main();

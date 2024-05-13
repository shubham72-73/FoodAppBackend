require('dotenv').config();

const mongoose = require("mongoose");
const mongoURI = process.env.DATA_BASE;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const fetchedData = await mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();
    global.food_items = data;

    const foodData = await mongoose.connection.db.collection("foodCategory");
    const itemdata = await foodData.find({}).toArray();
    global.foodCategory = itemdata;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
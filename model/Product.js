const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  prodname: {
    type: String,
  },
  price: {
    type: Number,
  },
  gstamount: {
    type: Number,
  },
  deliverycharge: {
    type: Number,
  },
  offer: {
    type: Number,
  },
});

module.exports = mongoose.model("Products", productSchema);

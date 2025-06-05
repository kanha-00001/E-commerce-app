const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: {
    type: String,
    default: "cod", // Default to "Cash on Delivery"
  },
  paymentStatus: {
    type: String,
    default: "pending", // Default to "pending" for COD
  },
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
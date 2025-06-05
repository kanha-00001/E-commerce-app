const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Validate required fields
    if (!userId || !cartItems || !addressInfo || !totalAmount || !cartId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create the order with COD
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "fulfilled", // Set to "fulfilled" for COD
      paymentMethod: "cod",
      paymentStatus: "pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
    });

    // Save the order
    await newlyCreatedOrder.save();

    // Update product stock
    for (let item of cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product: ${item.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Delete the cart after order creation
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json({
      success: true,
      message: "Order placed successfully with Cash on Delivery",
      orderId: newlyCreatedOrder._id,
      data: newlyCreatedOrder,
    });
  } catch (e) {
    console.error("Error creating order:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.error("Error fetching orders:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.error("Error fetching order details:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
import Product from "../models/Product.js";

// Place Order Controller
export const placeOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      subTotal,
      shipping,
      tax,
      productIds,
    } = req.body;

    if (!firstName || !lastName || !address || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message:
          "First name, last name, address, and phone number are required.",
      });
    }

    const quantityMap = {};
    if (Array.isArray(productIds)) {
      for (const id of productIds) {
        quantityMap[id] = (quantityMap[id] || 0) + 1;
      }
    }

    let productsDetails = [];
    if (productIds && productIds.length > 0) {
      const uniqueIds = [...new Set(productIds)];
      const products = await Product.find({ _id: { $in: uniqueIds } });

      productsDetails = products.map((product) => ({
        ...product.toObject(),
        quantity: quantityMap[product._id.toString()] || 1,
      }));
    }

    const taxRate = tax ? parseFloat(tax) / 100 : 0;
    const taxAmount = subTotal * taxRate;

    const shippingCost = shipping === "free" ? 0 : Number(shipping);

    const total = subTotal + taxAmount + shippingCost;

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      deliveryDetails: {
        firstName,
        lastName,
        address,
        phoneNumber,
      },
      priceDetails: {
        subTotal,
        taxAmount,
        shipping: shipping === "free" ? "Free" : shippingCost,
        total,
      },
      productsDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

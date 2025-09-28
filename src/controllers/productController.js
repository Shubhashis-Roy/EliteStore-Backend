import Product from "../models/Product.js";

//Get all products with optional search
export const getProducts = async (req, res) => {
  try {
    const { searchItem = "" } = req.query;

    const query = {
      $or: [
        { name: { $regex: searchItem, $options: "i" } },
        { description: { $regex: searchItem, $options: "i" } },
      ],
    };

    const products = await Product.find(query);

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Add a new product (create this to use to add the data in DB though Postman)
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      price,
      category,
      brand,
      features,
      rating,
      reviewCount,
      inStock,
      tags,
    } = req.body;

    // Basic validation for required fields
    if (!name || !image || !description || !price || !category || !brand) {
      return res.status(400).json({
        success: false,
        message:
          "Name, image, description, price, category, and brand are required.",
      });
    }

    const product = new Product({
      name,
      image,
      description,
      price,
      category,
      brand,
      features: features || [],
      rating: rating || 0,
      reviewCount: reviewCount || 0,
      inStock: inStock !== undefined ? inStock : true,
      tags: tags || [],
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

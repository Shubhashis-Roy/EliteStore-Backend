// 🔹 Static categories (no DB)
const categories = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    image:
      "https://res.cloudinary.com/dpibwslxz/image/upload/v1758996902/Premium_Wireless_Headphones_gjx4kn.jpg",
    productCount: 24,
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    image:
      "https://res.cloudinary.com/dpibwslxz/image/upload/v1758996872/Designer_Leather_Handbag_r2bvho.jpg",
    productCount: 18,
  },
  {
    id: "3",
    name: "Home & Living",
    slug: "home-living",
    image:
      "https://res.cloudinary.com/dpibwslxz/image/upload/v1758996910/Modern_Desk_Lamp_nsqewp.jpg",
    productCount: 12,
  },
];

// ✅ GET all categories (static response)
export const getCategories = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

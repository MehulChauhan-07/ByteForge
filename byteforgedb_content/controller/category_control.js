const categoryService = require("../services/categoryService");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(error.message === "Category not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

// Create category
const createCategory = async (req, res) => {
  try {
    console.log("Creating category with data:", req.body);

    // Validate required fields
    const requiredFields = [
      "id",
      "title",
      "description",
      "icon",
      "color",
      "order",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.message.includes("already exists")) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(error.message === "Category not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    res.json({
      message: "Category deleted successfully",
      deletedCategory: category,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(error.message === "Category not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

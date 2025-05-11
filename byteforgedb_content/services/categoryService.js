const Category = require("../models/category_Schema");

class CategoryService {
  // Get all categories
  async getAllCategories() {
    try {
      return await Category.find({}).sort({ order: 1 });
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  // Get category by ID
  async getCategoryById(id) {
    try {
      const category = await Category.findOne({ id });
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
  }

  // Create category
  async createCategory(categoryData) {
    try {
      // Validate category data
      if (
        !categoryData.id ||
        !categoryData.title ||
        !categoryData.description ||
        !categoryData.icon ||
        !categoryData.color ||
        categoryData.order === undefined
      ) {
        throw new Error("Missing required fields");
      }

      // Check for existing category
      const existingCategory = await Category.findOne({ id: categoryData.id });
      if (existingCategory) {
        throw new Error(`Category with ID ${categoryData.id} already exists`);
      }

      // Create new category
      const category = new Category({
        id: categoryData.id,
        title: categoryData.title,
        description: categoryData.description,
        icon: categoryData.icon,
        color: categoryData.color,
        order: categoryData.order,
        topics: categoryData.topics || [],
      });

      // Save category
      const savedCategory = await category.save();
      console.log("Category created successfully:", savedCategory);
      return savedCategory;
    } catch (error) {
      console.error("Error in createCategory:", error);
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  // Update category
  async updateCategory(id, updateData) {
    try {
      const category = await Category.findOneAndUpdate({ id }, updateData, {
        new: true,
        runValidators: true,
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  // Delete category
  async deleteCategory(id) {
    try {
      const category = await Category.findOneAndDelete({ id });
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();

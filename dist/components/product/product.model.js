"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// Payment schema
const ProductSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
// Create and export model
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=product.model.js.map
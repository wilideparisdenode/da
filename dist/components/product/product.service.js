"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("./product.model");
const mongoose_1 = require("mongoose");
class ProductService {
    async createProduct(data) {
        const product = { ...data, };
        const P = new product_model_1.ProductModel(product);
        await P.save();
        return P.toObject();
    }
    async getAllProducts() {
        return await product_model_1.ProductModel.find();
    }
    async getProductById(id) {
        return await product_model_1.ProductModel.findById(new mongoose_1.Types.ObjectId(id));
    }
    async updateProduct(id, data) {
        return await product_model_1.ProductModel.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), data, { new: true, lean: true });
    }
    async deleteProduct(id) {
        const deleted = await product_model_1.ProductModel.findByIdAndDelete(new mongoose_1.Types.ObjectId(id));
        return !!deleted;
    }
    async updateStock(id, quantity) {
        return product_model_1.ProductModel.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), { $inc: { stock: -quantity } }, { new: true, lean: true });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map
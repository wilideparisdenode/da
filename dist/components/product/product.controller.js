"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_service_1 = __importDefault(require("./product.service"));
const createProduct = async (req, res, next) => {
    try {
        const product = await product_service_1.default.createProduct(req.body);
        res.status(201).json({ success: true, data: product });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (_req, res, next) => {
    try {
        const products = await product_service_1.default.getAllProducts();
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res, next) => {
    try {
        const product = await product_service_1.default.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res, next) => {
    try {
        const product = await product_service_1.default.updateProduct(req.params.id, req.body);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await product_service_1.default.deleteProduct(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.addressSchema = exports.orderItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderItemSchema = new mongoose_1.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
exports.addressSchema = new mongoose_1.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
});
const orderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    items: [
        {
            productId: { type: mongoose_1.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    status: String,
    shippingAddress: { type: exports.addressSchema, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
//# sourceMappingURL=order.model.js.map
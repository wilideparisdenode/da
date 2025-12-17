"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
class UserService {
    // Get user by email (for authentication - includes password)
    async getUserByEmailForAuth(email) {
        return await user_model_1.User.findOne({ email }).lean();
    }
    // Get user by ID with password
    async getUserByIdWithPassword(id) {
        return await user_model_1.User.findById(id).lean();
    }
    // Update user password
    async updateUserPassword(id, newPassword) {
        const result = await user_model_1.User.findByIdAndUpdate(id, { password: newPassword });
        return !!result;
    }
    // Get user by email (without password - for public use)
    async getUserByEmail(email) {
        return await user_model_1.User.findOne({ email }).select('-password').lean();
    }
    // Create user
    async createUser(data) {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = {
            ...data,
            password: hashedPassword,
            role: data.role || 'user',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const u = new user_model_1.User(user);
        await u.save();
        const { password, ...userWithoutPassword } = u.toObject();
        // Convert null to undefined for avatar field
        return {
            ...userWithoutPassword,
            avatar: userWithoutPassword.avatar ?? undefined
        };
    }
    // Get all users
    async getAllUsers() {
        const users = await user_model_1.User.find().select('-password').lean();
        return users;
    }
    // Get user by ID
    async getUserById(id) {
        const user = await user_model_1.User.findById(id).select('-password').lean();
        return user;
    }
    // Update user
    async updateUser(id, data) {
        const user = await user_model_1.User.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true, lean: true }).select('-password');
        return user;
    }
    // Delete user
    async deleteUser(id) {
        const user = await user_model_1.User.findByIdAndDelete(id);
        return !!user;
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map
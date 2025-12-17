"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const createUser = async (req, res, next) => {
    try {
        const user = await user_service_1.default.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getAllUsers = async (_req, res, next) => {
    try {
        const users = await user_service_1.default.getAllUsers();
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const user = await user_service_1.default.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        const user = await user_service_1.default.updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const deleted = await user_service_1.default.deleteUser(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map
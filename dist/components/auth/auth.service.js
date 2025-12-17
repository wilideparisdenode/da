"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../user/user.service"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
class AuthService {
    constructor() {
        this.userService = user_service_1.default;
    }
    // Register new user
    async register(data) {
        try {
            // Check if user already exists
            const existingUser = await this.userService.getUserByEmail(data.email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            // Create user data
            const userData = {
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role || 'user',
                phone: data.phone,
            };
            // Create user (password will be hashed in user service)
            const user = await this.userService.createUser(userData);
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({
                userId: user._id.toString(),
                email: user.email,
                role: user.role
            }, JWT_SECRET, { expiresIn: '7d' });
            return {
                user: {
                    _id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    status: user.status,
                    phone: user.phone,
                    avatar: user.avatar
                },
                token
            };
        }
        catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
    // Login user
    async login(data) {
        try {
            // Find user by email (including password for verification)
            const user = await this.userService.getUserByEmailForAuth(data.email);
            if (!user) {
                throw new Error('Invalid email or password');
            }
            // Check if user is active
            if (user.status !== 'active') {
                throw new Error('Account is not active');
            }
            // Verify password
            const isValidPassword = await bcrypt_1.default.compare(data.password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({
                userId: user._id.toString(),
                email: user.email,
                role: user.role
            }, JWT_SECRET, { expiresIn: '7d' });
            return {
                user: {
                    _id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    status: user.status,
                    phone: user.phone,
                    avatar: user.avatar
                },
                token
            };
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    // Verify token
    async verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
    // Get current user profile
    async getProfile(userId) {
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            console.error('Get profile error:', error);
            throw error;
        }
    }
    // Change password
    async changePassword(userId, currentPassword, newPassword) {
        try {
            // First get user with password
            const userWithPassword = await this.getUserWithPassword(userId);
            if (!userWithPassword) {
                throw new Error('User not found');
            }
            // Verify current password
            const isValidPassword = await bcrypt_1.default.compare(currentPassword, userWithPassword.password);
            if (!isValidPassword) {
                throw new Error('Current password is incorrect');
            }
            // Hash new password
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            // Update password
            await this.userService.updateUserPassword(userId, hashedPassword);
            return { success: true, message: 'Password updated successfully' };
        }
        catch (error) {
            console.error('Change password error:', error);
            throw error;
        }
    }
    // Helper method to get user with password (for internal use)
    async getUserWithPassword(userId) {
        try {
            const user = await this.userService.getUserByIdWithPassword(userId);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map
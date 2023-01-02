"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../auth/user.decorator");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const users_service_1 = require("../services/users.service");
const Multer = require("multer");
const rxjs_1 = require("rxjs");
const path_1 = require("path");
let UsersController = class UsersController {
    constructor(serv) {
        this.serv = serv;
    }
    async getAll(page = 1, limit = 20) {
        try {
            return await this.serv.getUsers({ page, limit, route: 'users' });
        }
        catch (e) {
            throw new common_1.HttpException('Failed to get users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getByProfile(user) {
        try {
            return await this.serv.getProfile(user.userId);
        }
        catch (e) {
            throw new common_1.HttpException('Failed to get profile', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(id) {
        try {
            return this.serv.getById(id);
        }
        catch (err) {
            throw new common_1.HttpException('Failed to get user', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(user) {
        return await this.serv.create(user);
    }
    async changePassword(user, password) {
        try {
            await this.serv.updatePassword(password.currentPassword, password.newPassword, user.userId);
        }
        catch (err) {
            if (!password.newPassword)
                throw new common_1.HttpException('No new password was provided', common_1.HttpStatus.BAD_REQUEST);
            if (!password.currentPassword)
                throw new common_1.HttpException('Original password not provided', common_1.HttpStatus.BAD_REQUEST);
            throw new common_1.HttpException('The password does not match the original one.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async update(user, updatedUser) {
        return await this.serv.updateById(user.userId, updatedUser);
    }
    uploadFile(file, user) {
        try {
            return this.serv.updateProfileImg(file, user.userId);
        }
        catch (e) {
            if (!file)
                throw new common_1.HttpException('No file was received.', common_1.HttpStatus.BAD_REQUEST);
            throw new common_1.HttpException('Failed to upload file.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getProfileImage(image, res) {
        try {
            return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'https://storage.googleapis.com/tentynotes/' + image)));
        }
        catch (e) {
            throw new common_1.HttpException('File not found.', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async delete(user) {
        try {
            return await this.serv.delete(user.userId);
        }
        catch (e) {
            throw new common_1.HttpException('Failed to delete user.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/profile'),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getByProfile", null);
__decorate([
    (0, common_1.Get)('/profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreatUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/change-password'),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: Multer.memoryStorage(),
        limits: { fileSize: 2097152, files: 1 },
        fileFilter: (req, file, callback) => {
            return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
                ? callback(null, true)
                : callback(new common_1.BadRequestException('Only image files are allowed'), false);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('profile-image/:image'),
    __param(0, (0, common_1.Param)('image')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "getProfileImage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
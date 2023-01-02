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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const users_entity_1 = require("../../users/users.entity");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../../auth/services/auth.service");
const storage_1 = require("@google-cloud/storage");
const path_1 = require("path");
let UsersService = class UsersService {
    constructor(repo, auth) {
        this.repo = repo;
        this.auth = auth;
        this.storage = new storage_1.Storage({
            projectId: process.env.GCS_PROJECT,
            credentials: {
                client_email: process.env.GCS_CLIENT_EMAIL,
                private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
            },
        });
        this.bucket = this.storage.bucket(process.env.GCS_BUCKET);
    }
    async getAll() {
        return await this.repo.find({
            relations: {
                note: true,
            },
            select: {
                email: false,
                full_name: false,
                username: true,
                description: true,
                id: true,
            },
        });
    }
    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (await this.getByEmail(user.email)) {
            throw new common_1.HttpException('Email already in use', common_1.HttpStatus.BAD_REQUEST);
        }
        if (await this.getByUsername(user.username))
            throw new common_1.HttpException('Username already in use', common_1.HttpStatus.BAD_REQUEST);
        const newUser = {
            username: user.username,
            email: user.email.toLowerCase(),
            password: hashedPassword,
            profile_image: 'tenty-default-img.jpeg',
            description: "Hey I'm on Tenty Notes!",
            full_name: user.full_name,
        };
        await this.repo.save(newUser);
        return await this.auth.login(user);
    }
    async getById(id) {
        return await this.repo.findOne({
            where: { id: id },
            relations: { note: true },
            select: { email: false },
        });
    }
    async getProfile(id) {
        return await this.repo.findOne({
            where: { id: id },
            relations: { note: true },
        });
    }
    async getByEmail(email) {
        return await this.repo.findOne({
            where: { email: email },
            relations: { note: true },
            select: { password: true, id: true },
        });
    }
    async getByUsername(username) {
        return await this.repo.findOne({
            where: { username: username },
            relations: { note: true },
            select: { password: false, id: true },
        });
    }
    async updatePassword(currentPassword, newPassword, user) {
        const foundUser = await this.repo.findOne({
            where: { id: user.id },
            relations: { note: true },
            select: { password: true, id: true },
        });
        if (!currentPassword)
            return null;
        const checkPassword = await bcrypt.compare(currentPassword, foundUser.password);
        if (checkPassword == false) {
            return null;
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await this.repo.update(foundUser.id, Object.assign({}, (newPassword && { password: hashedPassword })));
    }
    async updateProfileImg(uploadedFile, id) {
        const user = await this.getById(id);
        if (user.profile_image != 'tenty-default-img.jpeg') {
            try {
                const fileToBeDeleted = this.bucket.file(user.profile_image);
                await fileToBeDeleted.delete();
            }
            catch (e) {
                console.log({
                    Error: e.message,
                    Response: 'Since there was no image found the users image is now set to the default',
                });
            }
            await this.updateById(id, { profile_image: 'tenty-default-img.jpeg' });
        }
        const setFilename = (uploadedFile) => {
            const fileName = (0, path_1.parse)(uploadedFile.originalname);
            return `${fileName.name}-${Date.now()}${fileName.ext}`
                .replace(/^\.+/g, '')
                .replace(/^\/+/g, '')
                .replace(/\r|\n/g, '_');
        };
        const filename = setFilename(uploadedFile);
        const file = this.bucket.file(filename);
        try {
            await file.save(uploadedFile.buffer, {
                contentType: uploadedFile.mimetype,
            });
        }
        catch (e) {
            console.log(e.message);
        }
        return this.updateById(id, { profile_image: file.name });
    }
    async updateById(id, user) {
        return await this.repo.update(id, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (user.username && { username: user.username })), (user.email && { email: user.email })), (user.full_name && { full_name: user.full_name })), (user.description && { description: user.description })), (user.profile_image && { profile_image: user.profile_image })));
    }
    async delete(id) {
        return await this.repo.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
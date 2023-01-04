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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const user_decorator_1 = require("../../auth/user.decorator");
const create_note_dto_1 = require("../../notes/dto/create-note.dto");
const notes_service_1 = require("../../notes/service/notes.service");
let NotesController = class NotesController {
    constructor(serv) {
        this.serv = serv;
    }
    async paginate(page = 1, limit = 10) {
        limit = limit > 10 ? 10 : limit;
        return this.serv.paginate({
            page,
            limit,
            route: 'notes',
        });
    }
    async getById(id) {
        return await this.serv.getById(id);
    }
    async getNotesByUser(page = 1, limit = 10, id) {
        try {
            return await this.serv.getByUserId({ page, limit, route: 'notes' }, Number(id));
        }
        catch (err) {
            throw new common_1.HttpException('Failed to retrieve notes.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(user, note) {
        try {
            return await this.serv.create({
                title: note.title,
                body: note.body,
                authorId: user.userId,
                is_pinned: false,
            });
        }
        catch (err) {
            if (err.status !== 400)
                throw new common_1.HttpException('Failed to create note.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            throw new common_1.HttpException('The required fields were not provided.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(user, id, note) {
        try {
            return await this.serv.updateById(id, user.userId, note);
        }
        catch (err) {
            console.log(err);
            if (err.status === 401)
                throw new common_1.HttpException('Failed to update note.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            throw new common_1.HttpException('This note belongs to another user.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async delete(user, id) {
        try {
            return await this.serv.delete(user.userId, id);
        }
        catch (err) {
            if (err.status !== 401)
                throw new common_1.HttpException('Failed to delete note.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            throw new common_1.HttpException('This note belongs to another user.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('notes-by-user/:id'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(2), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNotesByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "delete", null);
NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map
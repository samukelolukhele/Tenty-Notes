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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notes_entity_1 = require("../../notes/notes.entity");
const typeorm_2 = require("typeorm");
let NotesService = class NotesService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return await this.repo.find({
            relations: {
                author: true,
            },
        });
    }
    async create(note) {
        const date = new Date().toISOString().slice(0, 10);
        const newNote = await this.repo.create({
            title: note.title,
            body: note.body,
            is_pinned: false,
            authorId: note.authorId,
            created_at: date,
            updated_at: date,
        });
        return this.repo.save(newNote);
    }
    async update(userId, id, note) {
        const noteToUpdate = await this.repo.findOne({
            where: { id: id },
            select: {
                title: true,
                body: true,
            },
        });
        if (!noteToUpdate.id)
            return 'Note not found';
        if (noteToUpdate.authorId != userId)
            return new common_1.UnauthorizedException();
        await this.repo.update(id, Object.assign(Object.assign({}, (note.title && { title: note.title })), (note.body && { body: note.body })));
        return this.repo.findOne(id);
    }
    async getById(id) {
        return await this.repo.findOne({
            where: { id: id },
            relations: {
                author: true,
            },
        });
    }
    async getByUserId(userId) {
        return await this.repo.findOne({
            where: { authorId: userId },
            relations: {
                author: true,
            },
        });
    }
    async updateById(id, userId, note) {
        const noteToUpdate = await this.getById(id);
        const date = new Date().toISOString().slice(0, 10);
        if (noteToUpdate.authorId !== userId)
            return new common_1.UnauthorizedException();
        return await this.repo.update(id, Object.assign(Object.assign(Object.assign(Object.assign({}, (note.title && { title: note.title })), (note.body && { body: note.body })), (note.is_pinned && { is_pinned: note.is_pinned })), { updated_at: date }));
    }
    async delete(userId, id) {
        const noteToDel = await this.getById(id);
        if (noteToDel.authorId != userId)
            return new common_1.UnauthorizedException();
        return await this.repo.delete(id);
    }
};
NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notes_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map
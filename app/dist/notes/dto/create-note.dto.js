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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateNoteDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the note',
        example: 'Fundamentals of OOP',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contents of the note',
        example: 'OOP is a programming paradigm',
    }),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id of the author of the note',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateNoteDto.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Checks if the note is pinned by the user',
    }),
    __metadata("design:type", Boolean)
], CreateNoteDto.prototype, "is_pinned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the note was created',
        example: '2022/22/12',
    }),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date the note was last updated',
        example: '2022/22/12',
    }),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "updated_at", void 0);
exports.CreateNoteDto = CreateNoteDto;
//# sourceMappingURL=create-note.dto.js.map
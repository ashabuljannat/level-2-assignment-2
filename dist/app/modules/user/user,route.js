"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { StudentControllers } from './student.controller';
const router = express_1.default.Router();
// router.post('/create-student', StudentControllers.createStudent);
// router.get('/:studentId', StudentControllers.getSingleStudent);
// router.delete('/:studentId', StudentControllers.deleteStudent);
// router.get('/', StudentControllers.getAllStudents);
exports.StudentRoutes = router;

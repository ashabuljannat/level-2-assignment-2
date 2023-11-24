"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.UsersControllers.createUser);
router.get('/:userId', user_controller_1.UsersControllers.getSingleUser);
router.delete('/:userId', user_controller_1.UsersControllers.deleteUser);
router.put('/:userId', user_controller_1.UsersControllers.updateUser);
router.get('/', user_controller_1.UsersControllers.getAllUsers);
// router.get('/', (req, res) => {
//   res.send('hello user ts-node-dev');
// });
exports.UserRoutes = router;

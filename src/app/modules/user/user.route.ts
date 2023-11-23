import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();

router.post('/', UsersControllers.createUser);

router.get('/:userId', UsersControllers.getSingleUser);

router.delete('/:userId', UsersControllers.deleteUser);

router.put('/:userId', UsersControllers.updateUser);

router.get('/', UsersControllers.getAllUsers);

// router.get('/', (req, res) => {
//   res.send('hello user ts-node-dev');
// });

export const UserRoutes = router;

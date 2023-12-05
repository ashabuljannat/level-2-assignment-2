import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();

router.get('/', UsersControllers.getAllUsers);

router.post('/', UsersControllers.createUser);
  
router.get('/:userId', UsersControllers.getSingleUser);

router.delete('/:userId', UsersControllers.deleteUser);

router.put('/:userId', UsersControllers.updateUser);

router.put('/:userId/orders', UsersControllers.addNewOrder);

router.get('/:userId/orders', UsersControllers.getAllOrders);

router.get('/:userId/orders/total-price', UsersControllers.getAllOrdersPrice);

export const UserRoutes = router;

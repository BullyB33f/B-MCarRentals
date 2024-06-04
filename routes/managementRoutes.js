import express from 'express';
import { carUserDelete, createVehicle, deleteVehicle, editVehicle, getAllVehicles, getOneVehicle, rentVehicle, updateRentedVehicle, vehicleCategorySearch, vehicleMakeSearch } from '../controllers/vehicleController.js';
import { protect, registerUser } from '../controllers/authController.js';
import { deleteUser, displayUserVehicle, editUser, getAllUsers, getOneUser, userCarDeleted, userRentVehicle } from '../controllers/userController.js';
import { authRouter } from './authRouter.js';


//declaring different routers for each table
export const vehicleRouter = express.Router();
export const userRouter = express.Router();
export const adminRouter = express.Router();


//routing for vehicles
vehicleRouter.get('/all_vehicles', getAllVehicles);
vehicleRouter.get('/one_vehicle/:id', getOneVehicle);
vehicleRouter.get('/searchbymake/:make', vehicleMakeSearch);
vehicleRouter.get('/searchbycategory/:category', vehicleCategorySearch);







//routing for users


authRouter.use(protect);
vehicleRouter.post('/create_vehicle', createVehicle);
vehicleRouter.patch('/edit_vehicle/:id', editVehicle);
vehicleRouter.delete('/delete_vehicle/:id', deleteVehicle);
vehicleRouter.patch('/rent_vehicle/:id', rentVehicle);
vehicleRouter.patch('/update_rental', updateRentedVehicle);
vehicleRouter.patch('/vehicleuserdelete', carUserDelete);


userRouter.get('/user_vehicle/:id', displayUserVehicle);
userRouter.delete('/delete_user/:id', deleteUser);
userRouter.get('/all_users', getAllUsers);
userRouter.get('/one_user/:id', getOneUser);
userRouter.patch('/edit_user/:id', editUser);
userRouter.patch('/user_rent', userRentVehicle);
userRouter.patch('/usercardelete', userCarDeleted)
//importing pool data into controller
import fileUpload from "express-fileupload";
import express from "express";
import { pool } from "../database/dbConnection.js";
import multer from "multer";
import path from "path";
import { getRandomHex } from "../utils/utils.js";

const app = express();

app.use(fileUpload())

//retrieving all vehicles
export const getAllVehicles = async(req, res, _next) =>{
    let sqlQuery = `SELECT * from vehicle`;//sql query to retrieve all vehicle records

    const [vehicles] = await pool.query(sqlQuery);//putting sqlquery into action

    res.status(200).json({
        status: 'success',
        results: vehicles.length,
        data: {vehicles:vehicles}
    });
};

//retrieving one vehicle
export const getOneVehicle = async(req, res, _next) => {
    let sqlQuery = `SELECT * from vehicle where vehicle_id = ${req.params.id}`; //sql query for retrieving one vehicle via id

    const [vehicle] = await pool.query(sqlQuery) //executing get one vehicle

    if(vehicle.length <= 0){        //if else statement for error handling
        res.status(404).json({      //execution for no returned records
            status: 'error',
            message: 'Record not found'
        });
    }
        else{
            res.status(200).json({  //execution for returned records
                status: 'success',
                results: vehicle.length,
                data: {vehicle: vehicle[0]}
            });
        }
    }


//creating a new vehicle
export const createVehicle = async(req, res, _next) =>{

        console.log(req.files);








    let rStatus = 'available';
    let renter = 'none';

    

    let vfile1 = '';
    if(req.files){
        vfile1 = `${getRandomHex(8)}_${req.files.main_img.name}`  //will only be executed if user selects an image to upload
    }

    let vfile2 = '';
    if(req.files){
        vfile2 = `${getRandomHex(8)}_${req.files.img2.name}`  //will only be executed if user selects an image to upload
    }

    let vfile3 = '';
    if(req.files){
        vfile3 = `${getRandomHex(8)}_${req.files.img3.name}`  //will only be executed if user selects an image to upload
    }

    let vfile4 = '';
    if(req.files){
        vfile4 = `${getRandomHex(8)}_${req.files.img4.name}`  //will only be executed if user selects an image to upload
    }

    let vfile5 = '';
    if(req.files){
        vfile5 = `${getRandomHex(8)}_${req.files.img5.name}`  //will only be executed if user selects an image to upload
    }

    let sqlQuery = `INSERT INTO vehicle
    (make, model,main_img, img2, img3, img4, img5,price, minimum_rentdays, description, rent_status, user_id,category, current_renter)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)` //sql statement to insert values for new record into table

   
    if(req.files){
        req.files.main_img.mv('./uploads/'+ vfile1);
        req.files.img2.mv('./uploads/'+ vfile2);
        req.files.img3.mv('./uploads/'+ vfile3);
        req.files.img4.mv('./uploads/'+ vfile4);
        req.files.img5.mv('./uploads/'+ vfile5);
    }

    const [newvehicle] = await pool.query(sqlQuery,[
        req.body.make,
        req.body.model,
        vfile1,
        vfile2, 
        vfile3,
        vfile4, 
        vfile5,
        req.body.price,
        req.body.minimum_rentdays,
        req.body.description, 
        rStatus, 
        req.body.user_id,
        req.body.category,
        renter
    ]) //calling sql statement to execute

   
    
   


    //error handling for vehicle creation
    if(newvehicle <= 0){
        res.status(404).json({                  //executes if record could not be created
            status: 'error',
            message: 'record not created'
        });
    }else{
        res.status(201).json({                  //executes if record is created
            status: 'success',
            message: 'record created',
            results: newvehicle.length,
            insertId: newvehicle.insertId
        });
    }
}


//edit a record
export const editVehicle = async(req, res, _next) => {

    //sql statement to edit data in all data fields
    let sqlQuery = `UPDATE vehicle SET 
    make = ?, 
    model = ?,
    price = ?, 
    minimum_rentdays = ?, 
    description = ?, 
    rent_status = ?, 
    user_id = ?,
    category = ?, 
    current_renter = ?
     WHERE vehicle_id = ?`


    // let sqlQuery = `UPDATE vehicle SET make = ?, model = ?, main_img =?, img2 = ?, img3 = ?, img4 = ?, img5 = ?,
    // price = ?, minimum_rentdays = ?, description = ?, rent_status = ?, user_id = ?,category = ?, current_renter = ?  WHERE 
    // vehicle_id = ?`


    

    //concatenating sql query with field value inputs
    const [vehicle] = await pool.query(sqlQuery, [
        req.body.make, 
        req.body.model, 
        req.body.price, 
        req.body.minimum_rentdays, 
        req.body.description, 
        req.body.rent_status, 
        req.body.user_id, 
        req.body.category,
        req.body.current_renter,
        req.params.id]);

        

    //if then else statement for error handling
    if(vehicle.affectedRows <= 0){
        res.status(404).json({              //executes if record isnt found
            status: 'error',
            message: 'Record not changed'
        });
    }else{
        res.status(200).json({              //exexutes if record updates successfully
            status: 'success',
            message: 'record updated',
            results: vehicle.length,
            affectedRows: vehicle.affectedRows
        });
    }
}


//delete a vehicle 
export const deleteVehicle = async(req, res, _next) => {
    
    //sql statement to delete a record
    let sqlQuery = `Delete from vehicle Where vehicle_id = ?`

    //concatenating sql query and inputing id
    const [deletedvehicle] = await pool.query(sqlQuery, [req.params.id]);

    //error handling
    if(deletedvehicle.affectedRows == 0){
        res.status(404).json({
            status: 'error',
            message: 'record could not be deleted, check if it exists'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'successfully deleted',
            results: deletedvehicle.affectedRows
        })
    }
}


//searching for a vehicle by make
export const vehicleMakeSearch = async(req, res, _next) => {

    let sqlQuery = `SELECT * FROM vehicle where make like '%${req.params.make}%'`; //sql query using variable input into quotes

    const [makesearch] = await pool.query(sqlQuery);

    console.log(req.body.make)
    //if else error handling statement
    if(makesearch <= 0){
        res.status(404).json({
            status: 'error',
            message: 'No vehicles found'
        })
    }else{
        res.status(200).json({
            status: 'success',
            message: 'Vehicle(s) found',
            data: {makesearch:makesearch}  
        })
    }
}


//searching for a vehicle by category
export const vehicleCategorySearch = async(req, res, _next) => {

    let sqlQuery = `SELECT * FROM vehicle where category like '%${req.params.category}%'`; //sql query using variable input into quotes

    const [catsearch] = await pool.query(sqlQuery);

    //if else error handling statement
    if(catsearch <= 0){
        res.status(404).json({
            status: 'error',
            message: 'No vehicles found'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'Vehicle(s) found',
            data: {catsearch:catsearch}  
        })
    }
}


//searching for a vehicle by category
export const vehiclePriceSearch = async(req, res, _next) => {

    let sqlQuery = `SELECT * FROM vehicle where price < '${req.params.price}' and price >= '${req.params.price} - 10000'`; //sql query using variable input into quotes

    const [pricesearch] = await pool.query(sqlQuery);

    //if else error handling statement
    if(pricesearch <= 0){
        res.status(404).json({
            status: 'error',
            message: 'No vehicles found'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'Vehicle(s) found',
            data: {pricesearch:pricesearch}  
        })
    }
}


export const rentVehicle = async(req, res, _next) => {

    let sqlQuery = `UPDATE vehicle SET
     rent_status = 'not available', 
     user_id = ?,
     current_renter = ?,
     rent_start = ?,
     rent_end = ?
     WHERE  vehicle_id = ?`


    
    //concatenating sql query with field value inputs
    const [vehicle] = await pool.query(sqlQuery,
         [req.body.user_id, 
          req.body.current_renter,
          req.body.rent_start, 
          req.body.rent_end,
          req.params.id]);

    //if then else statement for error handling
    if(vehicle.affectedRows <= 0){
        res.status(404).json({              //executes if record isnt found
            status: 'error',
            message: 'Record not changed'
        });
    }else{
        res.status(200).json({              //exexutes if record updates successfully
            status: 'success',
            message: 'record updated',
            results: vehicle.length,
            affectedRows: vehicle.affectedRows
        });
    }

}


export const updateRentedVehicle = async(req, res, _next) => {


        let sqlQuery = `        
        update vehicle 
                inner join user on user.user_id = vehicle.user_id
                set vehicle.current_renter = user.user_fullname, 
                    vehicle.user_id = user.user_id
                     where vehicle.vehicle_id = ${req.body.vehicle_id};`

        
        const [updatedRental] = await pool.query(sqlQuery);

        if(updatedRental.affectedRows <= 0){
            res.status(404).json({
                status: 'error',
                message: 'error updating rental info'
            });
        }else{
            res.status(200).json({
                 status: 'success',
            message: 'record updated',
            results: updatedRental.length,
            affectedRows: updatedRental.affectedRows
            })
        }
}

export const carUserDelete = async(req, res, _next) => {

    let sqlFinder = `select * From vehicle where not exists
	( select * from user where user.user_id = vehicle.user_id)
    and user_id != 'none'  and user_id != '';`

    const [deadUser] = await pool.query(sqlFinder);

    const [carNouser] = await pool.query(`
    update vehicle set
    user_id = '', 
    current_renter = 'none',
    rent_start = '', 
    rent_end = '',
    rent_status = 'available' 
    where vehicle_id = ?`, [deadUser[0].vehicle_id]);

    if(carNouser.affectedRows <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not changed'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'record updated',
            results: carNouser.length,
            affectedRows: carNouser.affectedRows
        });
    }
}



  



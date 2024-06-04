import { pool } from "../database/dbConnection.js";

//function to retrive all users from the data base
export const getAllUsers = async(req, res, _next) =>{

    let sqlQuery = `SELECT * FROM user`; //sql statement to get 

    const [allusers] = await pool.query(sqlQuery); //

    res.status(200).json({
        status: 'success',
        results: allusers.length,
        data: {users:allusers}
    })

}


export const getOneUser = async(req, res, _next) => {
    let sqlQuery = `SELECT * from user where user_id = ${req.params.id}`;

    const [user] = await pool.query(sqlQuery);

    if(user.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not found'
        });
    }else{
        res.status(200).json({
            status: 'success',
            results: user.length,
            data: {user: user[0]}
        })
    }
}


export const editUser = async(req, res, _next) => {

    let sqlQuery = `UPDATE user set 
                    user_fullname = ?,
                    user_age = ?,
                    drivers_license_number = ?,
                    trn = ?,
                    user_email = ?,
                    user_password = ?,
                    current_vehicle_name = ? where user_id = ?`


    const [user] = await pool.query(sqlQuery,
                    [req.body.fullname,
                     req.body.age,
                     req.body.driverno,
                     req.body.trn,
                     req.body.email,
                     req.body.password,
                     req.body.current_vehicle,
                     req.params.id
                    ]
    )

    if(user.affectedRows <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not changed'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'record updated',
            results: user.length,
            affectedRows: user.affectedRows
        });
    }

}


export const deleteUser = async(req, res, _next) => {

    let sqlQuery = `Delete from user where user_id = ?`;

    const [deletedUser] = await pool.query(sqlQuery, [req.params.id]);

    if(deletedUser.affectedRows == 0){
        res.status(404).json({
            status: 'error',
            message: 'record could not be deleted, check if it exists'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'successfully deleted',
            results: deletedUser.affectedRows
        })
    }
}



export const userRentVehicle = async(req, res, _next) => {
    
    let sqlQuery = `update user u
    inner join vehicle v on v.user_id = u.user_id
    set u.current_vehicle_id = v.vehicle_id, 
        u.current_vehicle_name = concat(v.make, v.model);
    `

    const [userrent] = await pool.query(sqlQuery);

    if(userrent.affectedRows <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not changed'
        });
    }else{
        res.status(200).json({
            status: 'success',
            message: 'record updated',
            results: userrent.length,
            affectedRows: userrent.affectedRows
        });
    }
}

export const displayUserVehicle = async(req, res, _next) => {

    let sqlQuery = `select * from vehicle 
    inner join user on vehicle.user_id = user.user_id
    where user.user_id = ${req.params.id}`

    const [uservehicle] = await pool.query(sqlQuery);

    res.status(200).json({
        status: 'success',
        results: uservehicle.length,
        data: {uservehicle:uservehicle[0]}
    })


}


export const userCarDeleted = async(req, res, _next) => {
    
    let sqlQuery = `SELECT * FROM user  where not exists 
    ( select * from vehicle where  vehicle.vehicle_id =  user.current_vehicle_id) 
    and current_vehicle_id != 'none';` 

    const [finduser] = await pool.query(sqlQuery);

    const [deleteusercar] = await pool.query(
        `update user set current_vehicle_id = 'none', current_vehicle_name = 'none' where user_id = ?;`, [finduser[0].user_id])

        if(deleteusercar.affectedRows <= 0){
            res.status(404).json({
                status: 'error',
                message: 'Record not changed'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'record updated',
                results: deleteusercar.length,
                affectedRows: deleteusercar.affectedRows
            });
        }
}
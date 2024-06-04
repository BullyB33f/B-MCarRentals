import { pool } from "../database/dbConnection.js";

//security imports
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


const conn = pool;

/*
Function to create the JWT token based on inputs
*/

function signJWTWebtoken(user){
    return JWT.sign({ 
        user_id:user.user_id,
        user_name:user.user_fullname, 
        user_age:user.user_age, 
        driverslicno: user.drivers_license_number, 
        trn: user.trn,
        email: user.user_email},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}


export const registerUser = async(req, res, _next) =>{
    const sqlQuery = `INSERT INTO USER
    (user_fullname,
     user_age, 
     drivers_license_number, 
     trn, 
     user_email, 
     user_password)
     VALUES(?,?,?,?,?,?)`;


    const data = req.body;
    const vStatus = 'active';

    data.user_password = await bcrypt.hashSync(data.user_password);

    const [result] = await conn.query(sqlQuery,
         [ data.user_fullname,
           data.user_age, 
           data.drivers_license_number, 
           data.trn,
           data.user_email, 
           data.user_password
    ]);


    if(result.insertId > 0){
        const token = signJWTWebtoken({ 
            user_id:result.insertId, 
            user_name:data.user_fullname, 
            user_age:data.user_age, 
            driverslicno: data.drivers_license_number,
            trn: data.trn, 
            email: data.user_email
        });
        res.status(201).json({
            status: 'success',
            data: {
                token,
                user: data,
            }
        });
        }else{
            res.status(404).json({
                status: 'success',
                message: 'Error during registration...'
            })
        }
        
}


export const loginUser = async(req, res, next) => {
    const data = req.body;

   

   

    const [user] = await pool.query(`
    SELECT * FROM user WHERE trn = ?`, [data.trn]);
    
    
    if(!user.length)
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });

    if(!(await bcrypt.compare(data.password, user[0].user_password)))
        return res.status(400).json({
            status: 'error',
            message: 'Invalid credentials'    
        });

        const token = signJWTWebtoken(user[0]);

        user[0].user_password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                token,
                user: user[0]
            }
        })
}


export const protect = async(req, res, next) => {

    const authorization = req.get('Authorization');

    console.log(`REQUEST AUTHORIZATION  ${authorization}`);

    if(!authorization?.startsWith('Bearer'))
        return next(
            res.status(400).json({
                status: 'error',
                message: 'You need to be logged to access this feature...'
            })
        );
    const token = authorization.split(' ')[1];
    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`DECODED TOKEN: ${JSON.stringify(decoded)}`);

        const [user] = await conn.query(`SELECT * from user where user_id = ?`, [decoded.user_id]);
        if(!user.length)
            return next(
        res.status(404).json({
            status: 'error',
            message: 'This token is no longer valid or there is an error'
        })
    );

    const data = user[0];
    data.password = undefined;
    req.user = data;
    next();
    }catch(error){
            if(error.message == 'jwt expired')
                return next(
                    res.status(400).json({
                        status: 'error',
                        message: 'Token expired'
                    })
                );
                next();
    }
}



export const  getAllUsers = async(req, res, _next) => {


    const data = req.body;

    const [users] = await pool.query(`select * from user`);

    const userData = users;

    userData.forEach(user =>{
        user.user_password = undefined;
    })
   

    res.status(200).json({
        status: 'success',
        data: {
            users: users
        }
    })

}


export const  getThisUser = async(req, res, _next) => {
            const data = req.user;
            
            if(!data)
                return next();
            // data.password = undefined;
            const [user] = await conn.query(`select * from user where user_id = ?`, [data.user_id])

            if(!user.length)
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid request'
                })
                user[0].user_password = undefined;
                res.status(200).json({
                    status: 'success',
                    data: {
                        user: user[0]
                    }
                })

}

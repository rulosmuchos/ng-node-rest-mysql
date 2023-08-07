import { Request, Response } from 'express';

import pool from '../database';


const jwt = require('jsonwebtoken');

class UsersController {

    public async list(req: Request, res: Response): Promise<void> {
        const users = await pool.query('SELECT * FROM users');
        res.json(users);
    }
    public async signin(req: Request, res: Response): Promise<any> {
        const { username, password } = req.body;
        const users = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        console.log(users[0][0].password)
        if (users.length > 0) {
            if(users[0][0].password == password){
                const token = jwt.sign({_id:users[0].id},'secretKey');
                res.status(200).json({token})
                // res.json({ message: 'Loged in Successfully' });

            } else{
                res.status(401 ).json({ text: "password provided doesn't match" });                
            }

        } else {
            res.status(401).json({ text: "The user doesn't exits" });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const {username, password} = req.body;
        const result = await pool.query('INSERT INTO users set ?', [req.body]);
        // console.log(result.insertId);        
        const token = jwt.sign({_id:result.insertId},'secretKey');
        res.status(200).json({token})
        // res.json({ message: 'User Created' });
        
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProduct = req.body;
        await pool.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The product was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: "The product was deleted" });
    }
}

const usersController = new UsersController;
export default usersController;
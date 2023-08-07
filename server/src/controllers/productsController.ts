import { Request, Response } from 'express';


import pool from '../database';
const jwt = require('jsonwebtoken');

class ProductsController {

    public async list(req: any, res: Response): Promise<void> {
        
        const products = await pool.query('SELECT * FROM products',[req.payload._id]);
        res.json(products[0]);
        console.log(products[0])
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const products = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (products[0].length > 0) {
            return res.json(products[0][0]);
        }
        res.status(404).json({ text: "The product doesn't exits" });
    }

    public async create(req: any, res: Response): Promise<void> {
        req.body.createdby = req.payload._id
        const result = await pool.query('INSERT INTO products set ?', [req.body]);
        console.log("create : "+req.body);
        res.json({ message: 'Product Saved' });

        // res.json({ message: req.body });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.body)
        const oldProduct = req.body;
        await pool.query('UPDATE products set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The product was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        // await pool.query('UPDATE products SET enable = IF(enable=1, 0, 1) WHERE ID = ?;', [id]);
        res.json({ message: "The product was deleted" });
    }
    public async enable(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // await pool.query('DELETE FROM products WHERE id = ?', [id]);
        await pool.query('UPDATE products SET enable = IF(enable=1, 0, 1) WHERE ID = ?;', [id]);
        res.json({ message: "The product was toggled enabled" });
    }
    public async trash(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // await pool.query('UPDATE products SET status = "trash" WHERE ID = ?;', [id]);
        await pool.query('UPDATE products SET enable = IF(enable=1, 0, 1) WHERE ID = ?;', [id]);
        res.json({ message: "The product was sent to trash" });
    }
}

const productsController = new ProductsController;
export default productsController;
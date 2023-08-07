import { Request, Response } from 'express';


import pool from '../database';

class CategoriesController {

    public async list(req: any, res: Response): Promise<void> {
        
        const categories = await pool.query('SELECT * FROM dsc_categorias');
        res.json(categories[0]);
    }
}

const categoriesController = new CategoriesController;
export default categoriesController;
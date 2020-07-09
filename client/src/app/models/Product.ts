import { Title } from '@angular/platform-browser';

export interface Product {
    id?: number,
    title?: string,
    description?: string,
    image?: string,
    image2?: string,
    image3?: string,
    price?: string,
    whapp?: string,
    enable?:string,
    created_at?: Date,
};
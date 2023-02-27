import {Schema, model} from "mongoose";

interface IFProduct {
    name: string;
    price: number;
    category: string;
}

const ProductSchema = new Schema<IFProduct>({
    name: String,
    price: Number,
    category: String
});

const ProductModel = model<IFProduct>('Product', ProductSchema);
import {Schema, model} from "mongoose";

interface IFProduct {
    name: string;
    price: number;
    category: string;
}

const productSchema = new Schema<IFProduct>({
    name: String,
    price: Number,
    category: String
})

const ProductModel = model<IFProduct>("Product", productSchema);
export {ProductModel}
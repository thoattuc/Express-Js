import {Schema, model} from 'mongoose';

interface IFProduct {
    name: string;
    price: number;
    producer: string;
    image: string
}

const productSchema = new Schema<IFProduct>({
    name: String,
    price: Number,
    producer: String,
    image: String
})

const ProductModel = model<IFProduct>('Product', productSchema);

export {ProductModel};
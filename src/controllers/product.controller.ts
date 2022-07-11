import {Request, Response} from 'express'
import { CreateProductInput, ReadProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, findProduct, UpdateProduct, deleteProduct } from '../services/product.service';

export const createProductHandler = async(req:Request<{}, {}, CreateProductInput['body']>, res:Response) => {
    const user = res.locals.user._id;

    const product = await createProduct({...req.body, user})

    return res.send(product);
}

export const getProductHandler = async(req:Request<ReadProductInput['params']>, res:Response) => {
    const productId = req.params.productId;

    const product = await findProduct({productId});

    if(!product){
        return res.sendStatus(404);
    }

    return res.send(product)
}

export const updateProductHandler = async (req:Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>, res:Response) => {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({productId});

    if(!product){
        return res.status(404);
    }

    if(String(product.user) !== userId){
        return res.status(403);
    }

    const updatedProduct = await UpdateProduct({productId},{...req.body}, {new: true});

    return res.send(updatedProduct);
}

export const deleteProductHandler = async (req:Request<ReadProductInput['params']>, res:Response) => {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
}
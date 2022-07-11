import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import ProductModel, { ProductDocument } from "../model/product.model"

export const createProduct = async (input: Omit<DocumentDefinition<ProductDocument>, 'createdAt' | 'updatedAt'>) => {
    const newProduct = new ProductModel(input);
    await newProduct.save();

    return newProduct;
}

export const findProduct = async (
    query: FilterQuery<ProductDocument>, 
    options: QueryOptions = {lean:true}
) => {
    return await ProductModel.findOne(query, {}, options)
}

export const UpdateProduct = async (
    query: FilterQuery<ProductDocument>, 
    update: UpdateQuery<ProductDocument>, 
    options: QueryOptions
) => {
    return await ProductModel.findOneAndUpdate(
        query, 
        update, 
        options
    )
}

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
   return await ProductModel.findOneAndDelete(query)
}
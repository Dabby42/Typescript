import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import ProductModel, { ProductDocument } from "../model/product.model"
import { databaseResponseTimeHistogram } from "../utils/metrics";

export const createProduct = async (input: Omit<DocumentDefinition<ProductDocument>, 'createdAt' | 'updatedAt'>) => {
    const metricsLabels = {
        operation: 'createProduct'
    };
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const newProduct = new ProductModel(input);
        await newProduct.save();
        timer({...metricsLabels, success: 'true'})
        return newProduct;
    } catch (error) {
        timer({...metricsLabels, success: 'true'})
        throw error
    }
    
}

export const findProduct = async (
    query: FilterQuery<ProductDocument>, 
    options: QueryOptions = {lean:true}
) => {
    const metricsLabels = {
        operation: 'findProduct'
    };
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const product = await ProductModel.findOne(query, {}, options)
        timer({...metricsLabels, success: 'true'})
        return product;
    } catch (error) {
        timer({...metricsLabels, success: 'false'})
        throw false
    }
    
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
import supertest from 'supertest';
import createServer from '../utils/server';
//import {MongoMemoryServer} from 'mongodb-memory-server'
import * as ProductService from '../services/product.service'
import mongoose from 'mongoose';

const app = createServer();

const productId = 'product-1234';

const product = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: new mongoose.Types.ObjectId().toString(),
    productId,
    title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
    description:
      "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
    price: 879.99,
    image: "https://i.imgur.com/QlRphfQ.jpg",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0,
  };

describe('product', () => {
    describe('get product route', () => {
        describe('given product does not exist', () => {
            it('should return a 404', async () => {
                const findProductServiceMock = jest
                    .spyOn(ProductService, 'findProduct')
                    .mockRejectedValueOnce('Oh no! Product not found')

                supertest(app)
                .get(`/api/product/${productId}`)
                .end(function(err, res){
                    expect(res.statusCode).toBe(404);
                    expect(findProductServiceMock).toHaveBeenCalled();
                })       
            })
        })

        describe('given product does exist', () => {
            it('should return a 200 status and the product', async () => {
                const findProductServiceMock = jest
                    .spyOn(ProductService, 'findProduct')
                    // @ts-ignore
                    .mockReturnValueOnce(product)

                supertest(app)
                .get(`/api/product/${productId}`)
                .end(function(err, res){
                    expect(res.statusCode).toBe(200);
                    expect(findProductServiceMock).toHaveBeenCalledWith(productId);
                })       
            })
        })
    })
})

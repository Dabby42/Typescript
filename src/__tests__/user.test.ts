import * as UserService from '../services/user.service'
import * as SessionService from '../services/session.service'
import mongoose from 'mongoose';
import createServer from '../utils/server';
import supertest from 'supertest';
import { createUserSessionHandler } from "../controllers/session.controller";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userInput = {
    email: "test@example.com",
    name: "Jane Doe",
    password: "Password123",
    passwordConfirmation: "Password123",
};

const wrongUserInput = {
    email: "test@example.com",
    name: "Jane Doe",
    password: "Password123",
    passwordConfirmation: "123Password",
};

const userPayload = {
    _id: userId,
    email: 'jane.doe@example.com',
    name:'Jane Doe'
}

const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0,
};

// user
describe('user', () => {
    describe('user registration', () => {
        describe('given the username and password are valid', () => {
            it ('should return the user payload', () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload)

                supertest(app)
                .post('/api/users')
                .send(userInput)
                .end(function (err, res){
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual(userPayload)
                    expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
                })
            })

        })

        describe('given the passwords do not match', () => {
            it('should return a 400', () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload)

                supertest(app)
                .post('/api/users')
                .send(wrongUserInput)
                .end(function (err, res){
                    expect(res.statusCode).toBe(400);
                    expect(createUserServiceMock).not.toHaveBeenCalled();
                })
            })
        })

        describe('given the user service throws', () => {
            it ('should return a 409 error', () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockRejectedValueOnce('Oh no! :(')

                supertest(app)
                .post('/api/users')
                .send(userInput)
                .end(function (err, res){
                    expect(res.statusCode).toBe(409);
                    expect(createUserServiceMock).toHaveBeenCalled();
                })
            })
        })
    })

    describe('create user session', () => {
        describe('given the username and password are valid', () => {
            it ('should return a signed access token & refresh token', async() => {
                jest
                    .spyOn(UserService, "validatePassword")
                    // @ts-ignore
                    .mockReturnValue(userPayload);

                jest
                    .spyOn(SessionService, "createSession")
                    // @ts-ignore
                    .mockReturnValue(sessionPayload);

                const req = {
                    get: () => {
                        return "a user agent";
                    },
                    body: {
                        email: "test@example.com",
                        password: "Password123",
                    },
                };
              
                const send = jest.fn();
              
                const res = {
                    send,
                };
              
                // @ts-ignore
                await createUserSessionHandler(req, res);
              
                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                });
            })
        })
    })
})

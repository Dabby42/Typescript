import {object, string, TypeOf} from 'zod';

const createUserSchema = object({
    body: object({
        name: string({
            required_error: "name is required"
        }),
        password:string({
            required_error: "password is required"
        }),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required"
        }).min(6,'Password was contain a minimum of 6 chars'),
        email: string({
            required_error: 'email is required'
        }).email('Not a valid email address')
    }).refine((data) => data.password == data.passwordConfirmation,{
        message: 'passwords does not match',
        path: ['passwordConfirmation']
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>

export default createUserSchema;
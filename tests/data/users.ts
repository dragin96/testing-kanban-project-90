import {faker} from "@faker-js/faker";

export const validAuthData = {
    login: 'nickname',
    password: 'password'
}

export interface Users {
    email: string
    firstName: string
    lastName: string
    password: string
}
export const generateTestUsers = (): Users => ({
    email: faker.internet.email(),
    firstName: faker.person.firstName('female'),
    lastName: faker.person.lastName('female'),
    password: faker.word.words(5)
})

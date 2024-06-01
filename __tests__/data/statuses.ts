import {faker} from "@faker-js/faker";

export interface Statuses {
    name: string
    slug: string
}

export const generateStatuses = (): Statuses => ({
    name: faker.string.alphanumeric(10),
    slug: faker.word.words(1),
})

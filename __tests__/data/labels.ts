import {faker} from "@faker-js/faker";

export interface Labels {
    name: string
}

export const generateLabels = (): Labels => ({
    name: faker.string.alphanumeric(10),
})

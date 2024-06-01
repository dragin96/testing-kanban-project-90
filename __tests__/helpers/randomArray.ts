import {faker} from "@faker-js/faker";

export const randomArrayElement = <T>(arr: T[]): T => {
    const random = faker.number.int({min: 0, max: arr.length-1});

    return arr[random]
}

export const randomFilterElement = <T>(arr: T[]): T[] => {
    const randomBoolean = (): boolean => Boolean(faker.number.binary(1));

    return arr.filter(randomBoolean)
}

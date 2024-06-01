import {faker} from "@faker-js/faker";
import {randomArrayElement, randomFilterElement} from "../helpers/randomArray";
import {ListAssignee, ListStatus, Task} from "./task.type";


export const generateTasks = (obj?: Partial<Task>): Task => ({
    title: faker.string.alphanumeric(10),
    content: faker.word.words(10),
    assignee: randomArrayElement<ListAssignee>(["michael@example.com", "sarah@example.com",  "peter@outlook.com", "alice@hotmail.com"]),
    status: randomArrayElement<ListStatus>(['Published', 'To Publish', 'To Be Fixed', 'To Review', 'Draft']),
    label: randomFilterElement(['critical', 'task', 'enhancement', 'feature', 'bug']),
    ...obj
})

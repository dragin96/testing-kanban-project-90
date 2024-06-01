import {test} from "../helpers/fixtures/auth";

const filtersTestData = [
    {name: 'Фильтр по assignee c пустым результатом', filter: {assignee: 'emily@example.com'}, expectedTaskName: []},
    {name: 'Фильтр по assignee', filter: {assignee: 'alice@hotmail.com'}, expectedTaskName: ['Task 8', 'Task 9']},
    {name: 'Фильтр по status', filter: { status: 'Published'}, expectedTaskName: ['Task 4', 'Task 15', 'Task 10']},
    {name: 'Фильтр по label', filter: {label: 'critical'},  expectedTaskName: ['Task 15']},
    {name: 'Фильтр по assignee и status', filter: {assignee: 'john@google.com', status: 'To Be Fixed'}, expectedTaskName: ['Task 1']}
];

test.describe('Фильтр', async () => {
    for (const testCase of filtersTestData) {
        test(testCase.name, async ({app: {boardPage}}) => {
            await boardPage.open();

            await boardPage.filter.fillForm(testCase.filter);
            await boardPage.assertCardByTitles(testCase.expectedTaskName);
        });
    }
});

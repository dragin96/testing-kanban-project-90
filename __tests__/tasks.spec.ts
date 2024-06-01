import {expect, test} from "../helpers/fixtures/auth";
import {urls} from "../data/urls";
import {NoticeMessages} from "../components/noticeMessages.component";
import {generateTasks} from "../data/tasks";
import {Task} from "../data/task.type";
import {Cards} from "../page/tasks/components/Cards";
import {ColumnsBoard, status} from "../data/columnsBoard";

test.describe('Tasks', async ()=> {
    test.beforeEach(async ({ app: {formTasksPage}})=> {
        await formTasksPage.open(urls.tasks.create);
    });

    test('Корректное отображение формы', async ({ app: {formTasksPage}}) => {
        await formTasksPage.checkAllForm();
        await formTasksPage.checkVisibleButtonSave();
    });

    test('Успешное создание новой задачи', async ({app: {formTasksPage}}) => {
        const formValue: Task = generateTasks();

        await formTasksPage.fillForm<Task>(formValue);
        await formTasksPage.save();

        await formTasksPage.messages.expectMessages(NoticeMessages.created);
    });
});

let newTasks: Task
test.describe('Редактирование и удаление задачи', async () => {
    test.beforeEach(async ({app: {formTasksPage, boardPage}}) => {
        newTasks = generateTasks();

        await formTasksPage.open(urls.tasks.create);

        await formTasksPage.fillForm<Task>(newTasks);
        await formTasksPage.save();
        await formTasksPage.messages.expectMessages(NoticeMessages.created);

        await boardPage.open();
    });

    test('Успешное редактирование задачи', async ({page, app: {formTasksPage}}) => {
        const newTaskTestData = generateTasks();
        const card = Cards.getCardByTitle(newTasks.title, page);

        await card.edit();
        await formTasksPage.checkAllForm();
        await formTasksPage.fillForm<Task>(newTaskTestData);
        await formTasksPage.save();

        const cardUpdate = Cards.getCardByTitle(newTaskTestData.title, page);
        await cardUpdate.expectVisible();
    });

    test('Успешное удаление задачи', async ({page, app: {boardPage, taskPage}}) => {
        const card = Cards.getCardByTitle(newTasks.title, page);
        await card.open();
        await taskPage.delete();

        await boardPage.messages.expectMessages(NoticeMessages.deleted);
        await card.expectDeleted();
    });
    
    test('Перемещение задачи по доске', async ({page, app: {boardPage}}) => {
        const titleTask = 'Task 1';
        const targetStatus = ColumnsBoard.toPublish

        await boardPage.open()

        await boardPage.dragAndDrop(titleTask, targetStatus);

        // Проверяем, что статус установился
        const card = Cards.getCardByTitle(titleTask, page);
        await card.edit();
        await expect(page.getByText(status[targetStatus])).toBeVisible();
    });
})


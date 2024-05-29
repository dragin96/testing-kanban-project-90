import {expect, test} from "../helpers/fixtures/auth";
import {urls} from "../data/urls";
import {NoticeMessages} from "../components/noticeMessages.component";
import {generateStatuses, Statuses} from "../data/statuses";
import {TableActions} from "../components/table.component";

let newStatuses: Statuses;

test.describe('Форма создания нового статуса', ()=> {
    test.beforeEach(async ({ app: {formStatusPage}})=> {
        await formStatusPage.open(urls.statuses.create);
    });

    test('Корректное отображение формы', async ({ app: {formStatusPage}}) => {
        await formStatusPage.checkAllForm();
        await formStatusPage.checkVisibleButtonSave();
    });

    test('Успешное создание нового статуса', async ({app: {formStatusPage}}) => {
        const formValue: Statuses = generateStatuses();

        await formStatusPage.fillForm(formValue);
        await formStatusPage.save();

        await formStatusPage.messages.expectMessages(NoticeMessages.created);
    });
});


test.describe('Редактирование и удаление статуса', async () => {
    test.beforeEach(async ({app: {listStatuses, formStatusPage}})=> {
        newStatuses = generateStatuses();
        await listStatuses.open();
        await listStatuses.clickCreate();
        await formStatusPage.fillForm(newStatuses);
        await formStatusPage.save();
        await formStatusPage.messages.expectMessages(NoticeMessages.created);

        await listStatuses.open();
        await listStatuses.table.clickByRowText(newStatuses.name);

    });

    test('Успешное редактирование статуса', async ({app: {formStatusPage, listStatuses}}) => {
        const newStatusesTestData = generateStatuses();
        await formStatusPage.checkAllForm();
        await formStatusPage.fillForm(newStatusesTestData);
        await formStatusPage.save();

        await formStatusPage.messages.expectMessages(NoticeMessages.updated);
        await listStatuses.open();
        await listStatuses.table.expectDataRow(newStatusesTestData, { isExist: true });
    });

    test('Успешное удаление статуса', async ({app: {formStatusPage, listStatuses}}) => {
        await formStatusPage.delete();

        await formStatusPage.messages.expectMessages(NoticeMessages.deleted);
        await listStatuses.open();
        await listStatuses.table.expectDataRow(newStatuses, {isExist: false});
    });

    test('Успешное удаление всех статуса', async ({page, app: { listStatuses, formStatusPage}}) => {
        await listStatuses.open();

        await listStatuses.table.clickBySelectAll();
        await listStatuses.table.clickActions(TableActions.delete);
        await formStatusPage.messages.expectMessages(NoticeMessages.multiDeleted);

        await expect(page.getByText('No Task status yet.')).toBeVisible();
    });
});

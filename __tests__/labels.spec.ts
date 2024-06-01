import {expect, test} from "../helpers/fixtures/auth";
import {urls} from "../data/urls";
import {NoticeMessages} from "../components/noticeMessages.component";
import {generateLabels, Labels} from "../data/labels";
import {TableActions} from "../components/table.component";
import {EmptyElements} from "../data/emptyElements";

let newLabels: Labels;

test.describe('Форма создания нового label', ()=> {
   test.beforeEach(async ({ app: {formLabelPage}})=> {
      await formLabelPage.open(urls.labels.create);
   });

   test('Корректное отображение формы', async ({ app: {formLabelPage}}) => {
      await formLabelPage.checkAllForm();
      await formLabelPage.checkVisibleButtonSave();
   });

   test('Успешное создание нового label', async ({app: {formLabelPage}}) => {
      const formValue: Labels = generateLabels();

      await formLabelPage.fillForm<Labels>(formValue);
      await formLabelPage.save();

      await formLabelPage.messages.expectMessages(NoticeMessages.created);
   });
});


test.describe('Редактирование и удаление labels', async () => {
   test.beforeEach(async ({app: {listLabels, formLabelPage}})=> {
      newLabels = generateLabels();
      await listLabels.open();
      await listLabels.clickCreate();
      await formLabelPage.fillForm<Labels>(newLabels);
      await formLabelPage.save();
      await formLabelPage.messages.expectMessages(NoticeMessages.created);

      await listLabels.open();
      await listLabels.table.clickByRowText(newLabels.name);

   });

   test('Успешное редактирование label', async ({app: {formLabelPage, listLabels}}) => {
      const newLabelsTestData = generateLabels();
      await formLabelPage.checkAllForm();
      await formLabelPage.fillForm<Labels>(newLabelsTestData);
      await formLabelPage.save();

      await formLabelPage.messages.expectMessages(NoticeMessages.updated);
      await listLabels.open();
      await listLabels.table.expectDataRow(newLabelsTestData, { isExist: true });
   });

   test('Успешное удаление label', async ({app: {formLabelPage, listLabels}}) => {
      await formLabelPage.delete();

      await formLabelPage.messages.expectMessages(NoticeMessages.deleted);
      await listLabels.open();
      await listLabels.table.expectDataRow(newLabels, {isExist: false});
   });

   test('Успешное удаление всех label', async ({page, app: { listLabels, formLabelPage}}) => {
      await listLabels.open();

      await listLabels.table.clickBySelectAll();
      await listLabels.table.clickActions(TableActions.delete);
      await formLabelPage.messages.expectMessages(NoticeMessages.multiDeleted);

      await expect(page.getByText(EmptyElements.labels)).toBeVisible();
   });
});

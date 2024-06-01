import {faker} from "@faker-js/faker";
import {expect, test} from "../helpers/fixtures/auth";
import {urls} from "../data/urls";
import {NoticeMessages} from "../components/noticeMessages.component";
import {generateTestUsers, Users} from "../data/users";
import {TableActions} from "../components/table.component";
import {EmptyElements} from "../data/emptyElements";

let newUsers: Users;

test.describe('Форма создания нового пользователя', ()=> {
   test.beforeEach(async ({ app: {formUserPage}})=> {
      await formUserPage.open(urls.users.create);
   });

   test('Корректное отображение формы', async ({ app: {formUserPage}}) => {
      await formUserPage.checkAllForm();
      await formUserPage.checkVisibleButtonSave();
   });

   test('Успешное создание нового пользователя', async ({app: {formUserPage}}) => {
      const formValue = {
         email: faker.internet.email(),
         firstName: faker.person.firstName('female'),
         lastName: faker.person.lastName('female'),
         password: faker.word.words(5)
      }

      await formUserPage.fillForm<Users>(formValue);
      await formUserPage.save();

      await formUserPage.messages.expectMessages(NoticeMessages.created);
   });
});


test.describe('Редактирование и удаление пользователей', async () => {
   test.beforeEach(async ({app: {listUsers, formUserPage}})=> {
      newUsers = generateTestUsers();
      await listUsers.open();
      await listUsers.clickCreate();
      await formUserPage.fillForm<Users>(newUsers);
      await formUserPage.save();
      await formUserPage.messages.expectMessages(NoticeMessages.created);

      await listUsers.open();
      await listUsers.table.clickByRowText(newUsers.email);

   });

   test('Успешное редактирование пользователя', async ({page, app: {formUserPage, listUsers}}) => {
      const newUsersTestData: Partial<Users> = {
         firstName: faker.person.firstName('female'),
         lastName: faker.person.lastName('female'),
      }
      await formUserPage.checkAllForm();
      await formUserPage.fillForm<Partial<Users>>(newUsersTestData);
      await formUserPage.save();

      await formUserPage.messages.expectMessages(NoticeMessages.updated);
      await listUsers.open();
      await listUsers.table.expectDataRow(newUsersTestData, { isExist: true });
   });

   test('Успешное удаление пользователей', async ({app: {formUserPage, listUsers}}) => {
      await formUserPage.delete();

      await formUserPage.messages.expectMessages(NoticeMessages.deleted);
      await listUsers.open();
      await listUsers.table.expectDataRow(newUsers, {isExist: false});
   });

   test('Успешное удаление всех юзеров', async ({page, app: { listUsers, formUserPage}}) => {
      await listUsers.open();

      await listUsers.table.clickBySelectAll();
      await listUsers.table.clickActions(TableActions.delete);
      await formUserPage.messages.expectMessages(NoticeMessages.multiDeleted);

      await expect(page.getByText(EmptyElements.users)).toBeVisible();
   });
});

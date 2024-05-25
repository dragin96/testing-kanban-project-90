import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker";

test.describe('Создание нового пользователя', ()=> {
   test.beforeEach(async ({page})=> {
      const authData = {
         login: 'nickname',
         password: 'password'
      }

      await page.goto('http://localhost:5173/');
      await page.getByLabel('username').fill(authData.login);
      await page.getByLabel('password').fill(authData.password);
      await page.getByRole('button', { name: 'Sign in' }).click();
      await page.goto('http://localhost:5173/#/users/create');
   });

   test('Корректное отображение формы', async ({page}) => {
      const form = {
         email: page.getByLabel('Email'),
         firstName: page.getByLabel('First name'),
         lastName: page.getByLabel('Last name'),
         password: page.getByLabel('Password')
      }
      const button = page.getByRole('button', {name: 'Save'})

      for (const [key, locatorForm] of Object.entries(form)) {
         console.log(key, locatorForm);
         await expect(locatorForm).toBeVisible()
      }
      await expect(button).toBeVisible();
   });

   test('Create users', async ({page}) => {
      const formLocators = {
         email: page.getByLabel('Email'),
         firstName: page.getByLabel('First name'),
         lastName: page.getByLabel('Last name'),
         password: page.getByLabel('Password')
      }
      const formValue = {
         email: faker.internet.email(),
         firstName: faker.person.firstName('female'),
         lastName: faker.person.lastName('female'),
         password: faker.word.words(5)
      }

      for (const [keyForm, valueField] of Object.entries(formValue)) {
         await formLocators[keyForm].fill(valueField);
      }
      await page.getByRole('button', {name: 'Save'}).click();

      await expect(page.getByText('Element created')).toBeVisible();
   });
});

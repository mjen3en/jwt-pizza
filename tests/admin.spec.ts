import { test, expect } from 'playwright-test-coverage';

test('login as admin', async ({ page }) => {

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#navbar-dark')).toContainText('Admin');
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('button', { name: 'Add Franchise' })).toBeVisible();
});


  test('view all franchises', async ({ page }) => {
    //mocked login
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      //mocked get all franchises
      await page.route('*/**/api/franchise', async (route) => {
        //const listReq = { email: 'a@jwt.com', password: 'admin' };
        const listRes = [
            {
              id: 2,
              name: 'LotaPizza',
              stores: [
                { id: 4, name: 'Lehi' },
                { id: 5, name: 'Springville' },
                { id: 6, name: 'American Fork' },
              ],
            }
          ];
        expect(route.request().method()).toBe('GET');
        //expect(route.request().postDataJSON()).toMatchObject(listReq);
        await route.fulfill({ json: listRes });
      });

      await page.goto('http://localhost:5173/');

    //login as admin
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('table')).toContainText('LotaPizza');

  });

  test('add store', async ({ page }) => {
    //mocked login
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      //mocked get user franchises
      await page.route('*/**/api/franchise/3', async (route) => {
        const loginReq = {bearer : 'abcdef'}
        const loginRes = [
            {
              id: 2,
              name: 'LotaPizza',
              stores: [
              ],
            }
          ];
        expect(route.request().method()).toBe('GET');
        //expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });


      await page.route('*/**/api/franchise/2/store', async (route) => {
        const createReq = {"franchiseId": 2, "name":"Provo"}
        const createRes = { id: 1, name: 'Provo', totalRevenue: 0 }
        expect(route.request().method()).toBe('POST');
        //expect(route.request().postDataJSON()).toMatchObject(createReq);
        await route.fulfill({ json: createRes });
      });




    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();

    //get user franchises
    await page.getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('button', { name: 'Create store' }).click();
    //create new store
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('Provo');
    await page.getByRole('button', { name: 'Create' }).click();



  });

  test('add menu item', async ({ page }) => {
    //mocked login
    




  });
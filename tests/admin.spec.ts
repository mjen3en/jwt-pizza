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

// test('add franchise', async ({ page }) => {
//     //mocked login
//     await page.route('*/**/api/auth', async (route) => {
//         const loginReq = { email: 'a@jwt.com', password: 'admin' };
//         const loginRes = { user: { id: 3, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
//         expect(route.request().method()).toBe('PUT');
//         expect(route.request().postDataJSON()).toMatchObject(loginReq);
//         await route.fulfill({ json: loginRes });
//       });

//       //mocked add franchise
//       await page.route('*/**/api/franchise', async (route) => {
//         const createFranchiseReq = {"name": "newfranchise", "admins": [{"email": "a@jwt.com"}]};
//         const createFranchiseRes = { name: 'newfranchise', admins: [{ email: 'a@jwt.com', id: 4, name: '常用名字' }], id: 1 };
//         expect(route.request().method()).toBe('POST');
//         expect(route.request().postDataJSON()).toMatchObject(createFranchiseReq);
//         await route.fulfill({ json: createFranchiseRes });
//       });

//     //go to home page
//     await page.goto('http://localhost:5173/');

//     //login as admin
//     await page.getByRole('link', { name: 'Login' }).click();
//     await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
//     await page.getByRole('textbox', { name: 'Password' }).click();
//     await page.getByRole('textbox', { name: 'Password' }).fill('admin');
//     await page.getByRole('button', { name: 'Login' }).click();

//     //add franchise
//     await page.getByRole('link', { name: 'Admin' }).click();
//     await page.getByRole('button', { name: 'Add Franchise' }).click();
//     await page.getByRole('textbox', { name: 'franchise name' }).click();
//     await page.getByRole('textbox', { name: 'franchise name' }).fill('newfranchise');
//     await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
//     await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
//     await page.getByRole('button', { name: 'Create' }).click();
//     await expect(page.getByRole('table')).toContainText('newfranchise');
//     await expect(page.getByRole('table')).toContainText('常用名字');
//   });

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
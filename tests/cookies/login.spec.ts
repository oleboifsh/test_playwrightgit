import { expect, test } from '@playwright/test'
import { LoginPage } from '../../pages/loginpage'
import { StorePage } from '../../pages/storepage';

test('Test to login and buy', async ({page}) => {

    await page.goto('https://hoff.is/cookies/store');
    await page.waitForTimeout(200);
    //await new LoginPage(page).login("Markus", "sup3rs3cr3t", 'business');
    await expect(new StorePage(page).userName).toHaveText("User: Markus");

    //expect(new StorePage(page).getUsername()).toBe("Markus");
})
import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker";


test.describe ("Local simple form test", async  () => {
    test.beforeEach(async ({ page }) => {
        const path = require('path');
        const filePath = `file://${path.resolve('src/simpleForm.html')}`;
        await page.goto(filePath);
    })
    test('Form opens', async ({ page }) => {
        //locators
        const emailField = page.getByTestId("email");
        const usernameField = page.getByTestId("username");
        const submitButton = page.getByTestId("submit-order");
        const popupMessage = page.locator("#popup-message");

        //actions
        //await page.goto('http://localhost:3000');
        await  expect(emailField).toBeVisible();
        // expect(await emailField.innerText()).toBe("test@test.test")
        await expect(usernameField).toBeVisible();
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeDisabled();
        //await usernameField.pressSequentially("username", {delay:50})
        await usernameField.fill(faker.internet.username());
        await expect(submitButton).toBeDisabled();
        await emailField.fill(faker.internet.email());
        await expect(submitButton).toBeEnabled();
        await expect(popupMessage).not.toBeVisible();
        await submitButton.click();
        await expect(popupMessage).toBeVisible();
        await page.waitForTimeout(5100);
        await expect(popupMessage).not.toBeVisible();
    });
})


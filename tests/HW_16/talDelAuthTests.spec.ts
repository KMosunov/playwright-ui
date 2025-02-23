import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker";

test.describe ("Tallinn Delivery authorization test", async  () => {
    test.beforeEach(async ({ page }) => {
        //const x = UrlDTO.createUrl()
        await page.goto(process.env.APP_URL);
    })
    test('TL-16-1 Sigh In Form', async ({ page }) => {
        const loginField = page.locator("#username");
        const passwordField = page.locator("#password");
        const signInButton = page.locator("[data-name=\"signIn-button\"]");
        const formError = page.locator("[class=\"form-error form-error_active\"]")
        const popUp = page.locator("[data-name=\"authorizationError-popup\"]");
        const popupErrorTitle = page.locator('[class="error-popup__title"]');
        const buttonClose = page.locator('[data-name="authorizationError-popup-close-button"]')

        await expect(loginField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(signInButton).toBeVisible();
        await expect(signInButton).toBeEnabled();

        await loginField.fill(faker.string.alpha(1));
        await expect(formError).toBeVisible()
        await expect(formError).toContainText('The field must contain at least of characters: 2')
        await expect(signInButton).toBeDisabled();

        await loginField.fill(faker.string.alpha(0))
        await expect(formError).toContainText('The field must be filled in')

        await loginField.fill(faker.string.alpha(2));
        await expect(formError).not.toBeVisible();
        await expect(signInButton).toBeDisabled();

        await passwordField.fill(faker.internet.password({length: 1}));
        await expect(signInButton).toBeDisabled()
        await expect(formError).toBeVisible()
        await expect(formError).toContainText('The field must contain at least of characters: 8')

        await passwordField.fill(faker.internet.password({length: 0}));
        await expect(formError).toBeVisible()
        await expect(formError).toContainText('The field must be filled in')

        await passwordField.fill(faker.internet.password({length: 8}))
        await expect(signInButton).toBeEnabled()

        await signInButton.click()
        await expect(popUp).toBeVisible()
        await expect(popupErrorTitle).toContainText('Incorrect credentials');
        await expect(buttonClose).toBeEnabled();
        await buttonClose.click()

        await expect(popUp).not.toBeVisible()
        await expect(signInButton).toBeEnabled();

    });
})


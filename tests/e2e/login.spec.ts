import { test, expect } from '../../src/fixtures/test.fixture';
import { TEST_USERS, ERROR_MESSAGES } from '../../src/data/constants';
import * as allure from 'allure-js-commons';

test.describe('Login Functionality', () => {
    test.beforeEach(async () => {
        await allure.epic('Authentication');
        await allure.feature('Login');
    });

    test('should login successfully with valid credentials @smoke', async ({ loginPage }) => {
        await allure.story('Valid Login');
        await allure.description(`
            Test valid login flow with correct credentials.
            Expects successful login and redirection.
        `);
        
        await loginPage.navigate('/login');
        await allure.step('Login with valid credentials', async () => {
            await loginPage.login(
                TEST_USERS.VALID_USER.username,
                TEST_USERS.VALID_USER.password
            );
        });
        
        await allure.step('Verify successful login', async () => {
            expect(await loginPage.isLoggedIn()).toBeTruthy();
        });
    });

    test('should show error message with invalid credentials', async ({ loginPage }) => {
        await loginPage.navigate('/login');
        await loginPage.login(
            TEST_USERS.INVALID_USER.username,
            TEST_USERS.INVALID_USER.password
        );
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(ERROR_MESSAGES.INVALID_LOGIN);
    });

    test('should handle empty credentials', async ({ loginPage }) => {
        await loginPage.navigate('/login');
        await loginPage.login('', '');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
    });
}); 
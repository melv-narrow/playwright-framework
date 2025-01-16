import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { logger } from '../helpers/logger.helper';

// Declare the types of fixtures
type Fixtures = {
    loginPage: LoginPage;
};

// Extend the base test with our fixtures
export const test = base.extend<Fixtures>({
    // Define loginPage fixture
    loginPage: async ({ page }, use) => {
        logger.info('Setting up LoginPage fixture');
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export { expect } from '@playwright/test'; 
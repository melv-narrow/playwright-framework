import { BasePage } from './base.page';
import { allureStep } from '../helpers/allure.helper';

export class LoginPage extends BasePage {
    // Selectors
    private readonly usernameInput = '[data-testid="username"]';
    private readonly passwordInput = '[data-testid="password"]';
    private readonly loginButton = '[data-testid="login-button"]';
    private readonly errorMessage = '[data-testid="error-message"]';

    /**
     * Login with username and password
     * @param username - Username to login with
     * @param password - Password to login with
     */
    @allureStep('Login with username: {username}')
    async login(username: string, password: string): Promise<void> {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    /**
     * Get error message text if present
     */
    async getErrorMessage(): Promise<string> {
        return this.getText(this.errorMessage);
    }

    /**
     * Check if user is logged in
     */
    async isLoggedIn(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.loginButton, { state: 'detached', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
} 
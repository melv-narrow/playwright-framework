import { Page } from '@playwright/test';
import { logger } from '../helpers/logger.helper';

export class CommonUtils {
    /**
     * Generate a random string
     * @param length - Length of the string to generate
     */
    static generateRandomString(length: number): string {
        return Math.random().toString(36).substring(2, length + 2);
    }

    /**
     * Wait for a specific amount of time
     * @param ms - Milliseconds to wait
     */
    static async wait(ms: number): Promise<void> {
        logger.info(`Waiting for ${ms}ms`);
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Take a screenshot and save it
     * @param page - Playwright page object
     * @param name - Name of the screenshot
     */
    static async takeScreenshot(page: Page, name: string): Promise<Buffer> {
        logger.info(`Taking screenshot: ${name}`);
        return await page.screenshot({ 
            path: `./screenshots/${name}.png`,
            fullPage: true 
        });
    }

    /**
     * Get current date time string
     */
    static getDateTime(): string {
        return new Date().toISOString().replace(/[:.]/g, '-');
    }

    /**
     * Parse environment variables with type safety
     * @param key - Environment variable key
     * @param defaultValue - Default value if not found
     */
    static getEnvVariable(key: string, defaultValue?: string): string {
        const value = process.env[key] || defaultValue;
        if (value === undefined) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return value;
    }
} 
import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../helpers/logger.helper';
import * as allure from 'allure-js-commons';

export class BasePage {
    constructor(protected page: Page) {}

    /**
     * Navigate to a specific URL
     * @param url - The URL to navigate to
     */
    async navigate(url: string): Promise<void> {
        return await allure.step(`Navigate to ${url}`, async () => {
            logger.info(`Navigating to ${url}`);
            await this.page.goto(url);
        });
    }

    /**
     * Get element by selector with built-in wait
     * @param selector - The selector to find the element
     */
    protected async getElement(selector: string): Promise<Locator> {
        return await allure.step(`Get element ${selector}`, async () => {
            const element = this.page.locator(selector);
            try {
                await element.waitFor({ state: 'attached' });
                return element;
            } catch (error) {
                logger.error(`Failed to find element: ${selector}`);
                await allure.attachment('Page State', await this.page.content(), 'text/html');
                await allure.attachment('Screenshot', await this.page.screenshot(), 'image/png');
                throw error;
            }
        });
    }

    /**
     * Click an element with retry logic
     * @param selector - The selector to find the element
     */
    @allureStep('Click on element {selector}')
    async click(selector: string): Promise<void> {
        logger.info(`Clicking element: ${selector}`);
        const element = await this.getElement(selector);
        await element.click();
    }

    /**
     * Type text into an input field
     * @param selector - The selector to find the element
     * @param text - The text to type
     */
    @allureStep('Type {text} into {selector}')
    async type(selector: string, text: string): Promise<void> {
        logger.info(`Typing "${text}" into ${selector}`);
        const element = await this.getElement(selector);
        await element.fill(text);
    }

    /**
     * Get text from an element
     * @param selector - The selector to find the element
     */
    async getText(selector: string): Promise<string> {
        const element = await this.getElement(selector);
        return element.innerText();
    }

    /**
     * Wait for element to be visible
     * @param selector - The selector to find the element
     */
    async waitForElement(selector: string, timeout = 5000): Promise<void> {
        logger.info(`Waiting for element: ${selector}`);
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible', timeout });
    }

    /**
     * Assert element is visible
     * @param selector - The selector to find the element
     */
    @allureStep('Assert element {selector} is visible')
    async assertElementVisible(selector: string): Promise<void> {
        const element = await this.getElement(selector);
        await expect(element).toBeVisible();
    }
} 
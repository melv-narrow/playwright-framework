import { test, expect } from '../../src/fixtures/test.fixture';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import * as allure from 'allure-js-commons';

const records = parse(fs.readFileSync(path.join(__dirname, '../data/login-test-cases.csv')), {
    columns: true,
    skip_empty_lines: true
});

for (const record of records) {
    test(`Login Test: ${record.test_case}`, async ({ loginPage }) => {
        await allure.story(record.test_case);
        
        await loginPage.navigate('/login');
        await loginPage.login(record.username, record.password);
        
        if (record.expected_result === 'success') {
            expect(await loginPage.isLoggedIn()).toBeTruthy();
        } else if (record.expected_result === 'error') {
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toBe('Invalid username or password');
        } else if (record.expected_result === 'required') {
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toBe('This field is required');
        }
    });
} 
import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../../src/data/constants';
import { TestData } from '../../src/data/test.data';

test.describe('Users API', () => {
    const baseUrl = TestData.getTestDataFromEnv().baseUrl;
    
    test('should create a new user', async ({ request }) => {
        const newUser = TestData.generateTestUser();
        
        const response = await request.post(`${baseUrl}${API_ENDPOINTS.USERS}`, {
            data: newUser
        });
        
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody.username).toBe(newUser.username);
    });

    test('should get user details', async ({ request }) => {
        // First create a user
        const newUser = TestData.generateTestUser();
        const createResponse = await request.post(`${baseUrl}${API_ENDPOINTS.USERS}`, {
            data: newUser
        });
        const { id } = await createResponse.json();

        // Then get user details
        const response = await request.get(`${baseUrl}${API_ENDPOINTS.USERS}/${id}`);
        
        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        expect(user.username).toBe(newUser.username);
        expect(user.email).toBe(newUser.email);
    });

    test('should handle invalid user request', async ({ request }) => {
        const response = await request.get(`${baseUrl}${API_ENDPOINTS.USERS}/999999`);
        
        expect(response.status()).toBe(404);
    });
}); 
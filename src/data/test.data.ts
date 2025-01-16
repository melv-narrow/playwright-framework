import { CommonUtils } from '../utils/common.utils';

export class TestData {
    static generateTestUser() {
        return {
            username: `test_user_${CommonUtils.generateRandomString(6)}`,
            password: `pass_${CommonUtils.generateRandomString(8)}`,
            email: `${CommonUtils.generateRandomString(8)}@test.com`
        };
    }

    static getTestDataFromEnv() {
        return {
            baseUrl: CommonUtils.getEnvVariable('BASE_URL', 'http://localhost:3000'),
            apiKey: CommonUtils.getEnvVariable('API_KEY'),
            environment: CommonUtils.getEnvVariable('ENV', 'dev')
        };
    }
} 
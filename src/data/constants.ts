export const TEST_USERS = {
    VALID_USER: {
        username: 'testuser',
        password: 'password123'
    },
    INVALID_USER: {
        username: 'invalid',
        password: 'wrong'
    }
};

export const TIMEOUTS = {
    TINY: 1000,
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000
};

export const API_ENDPOINTS = {
    USERS: '/api/users',
    LOGIN: '/api/login',
    LOGOUT: '/api/logout'
};

export const ERROR_MESSAGES = {
    INVALID_LOGIN: 'Invalid username or password',
    REQUIRED_FIELD: 'This field is required',
    SERVER_ERROR: 'Internal server error'
}; 
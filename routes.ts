/**
 * An array of public routes
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/appraisals/appraisalForm/evaluator/[token]'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect to the dashboard if the user is already authenticated.
 * @type {string[]}
 */
export const authRoutes: string[] = ['/auth/signin', '/api/auth/signin'];

/**
 * The prefix for the API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * This is the default route that the user will be redirected to after logging in.
 *
 * @type {string}
 */
export const DEFAULT_HOME_REDIRECT: string = '/home';

/**
 * This is the default route that the user will be redirected to if they are not logged in.
 *
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/auth/signin';

import AllureReporter from '@wdio/allure-reporter';

/**
 * Decorator for adding Allure steps to methods
 * @param stepName - Name of the step (supports parameter interpolation)
 */
export function allureStep(stepName: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            // Replace parameters in step name
            const interpolatedStepName = stepName.replace(
                /\{(\w+)\}/g,
                (match, param) => args[param] || match
            );

            AllureReporter.startStep(interpolatedStepName);
            try {
                const result = await originalMethod.apply(this, args);
                AllureReporter.endStep('passed');
                return result;
            } catch (error) {
                AllureReporter.endStep('failed');
                throw error;
            }
        };

        return descriptor;
    };
}

/**
 * Add an attachment to the Allure report
 * @param name - Name of the attachment
 * @param content - Content to attach
 * @param type - MIME type of the content
 */
export function addAllureAttachment(
    name: string,
    content: string | Buffer,
    type: string
): void {
    AllureReporter.addAttachment(name, content, type);
} 
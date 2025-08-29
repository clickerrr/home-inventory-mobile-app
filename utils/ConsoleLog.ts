export const toLog = (message: string, functionCall?: string, fileName?: string) => {
    console.log(`[${functionCall ?? ''}${fileName ? `:${fileName}` : ''}]:`, message);
};
export const logError = (message: string, functionCall?: string, fileName?: string) => {
    console.log(`[${functionCall ?? ''}${fileName ? `:${fileName}` : ''}]:`, message);
};

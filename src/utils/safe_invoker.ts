function safeParseFloat(str: string): number {
    try {
        return parseFloat(str);
    } catch (e) {
        return 0.0;
    }
}

function safeParseInt(str: string): number {
    try {
        return parseInt(str);
    } catch (e) {
        return 0;
    }
}

function safeParse(str: string): object {
    try {
        if (!str) {
            return {};
        }
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}

export {
    safeParseFloat,
    safeParse,
    safeParseInt
}


// Lists of domains to apply special rules
export const domainsWithSubaddressing = new Set([
    'gmail.com',
    'googlemail.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'yahoo.com',
    'icloud.com',
]);

export const domainsWithDots = new Set(['gmail.com', 'googlemail.com']);

// Mapping of domain aliases to their canonical names
export const domainAliases = {
    'googlemail.com': 'gmail.com',
    'hotmail.com': 'outlook.com',
    'live.com': 'outlook.com',
};

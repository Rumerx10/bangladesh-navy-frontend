export const EMAIL_MAX_LENGTH = 254;

// yup's own email check accepts addresses without a domain suffix
// ("info@navy"), which can never receive mail — require a dot-separated TLD.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

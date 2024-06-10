export const validate = (data, rules) => {
  for (const key in rules) {
    const rule = rules[key];
    const value = data[key];

    if (rule.required && (value === undefined || value === null)) {
      return `${key} is required`;
    }

    if (value === undefined || value === null) {
      continue;
    }

    if (rule.type && typeof value !== rule.type) {
      return `${key} must be a ${rule.type}`;
    }

    if (rule.min !== undefined && value < rule.min) {
      return `${key} must be at least ${rule.min}`;
    }

    if (rule.max !== undefined && value > rule.max) {
      return `${key} must be at most ${rule.max}`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return `${key} is not in the correct format`;
    }

    if (rule.minLength !== undefined && value.length < rule.minLength) {
      return `${key} must be at least ${rule.minLength} characters long`;
    }
  }
  return null;
};

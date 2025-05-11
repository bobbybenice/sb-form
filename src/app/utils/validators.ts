const fieldLabels: Record<string, string> = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  message: 'Message',
};

export const validateField = (name: string, value: string): string => {
  const label = fieldLabels[name] || name;

  if (!value.trim()) {
    return `${label} is required.`;
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return 'Enter a valid email address.';
  }

  return '';
};

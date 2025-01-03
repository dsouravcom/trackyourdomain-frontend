export function convertToDate(dateInput: string | number): Date {
  if (typeof dateInput === 'number' || !isNaN(Number(dateInput))) {
    // If it's a number or a numeric string, treat it as a Unix timestamp
    return new Date(Number(dateInput) * 1000);
  }
  // Otherwise, treat it as a date string
  return new Date(dateInput);
}

export function calculateElapsedDays(startDate: string | number): number {
  const start = convertToDate(startDate);
  const today = new Date();
  return Math.max(0, Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export function calculateTotalDays(startDate: string | number, endDate: string | number): number {
  const start = convertToDate(startDate);
  const end = convertToDate(endDate);
  return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export function formatDate(dateInput: string | number): string {
  const date = convertToDate(dateInput);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}


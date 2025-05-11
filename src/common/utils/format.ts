export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}; 

export const parsePriceInput = (text: string): string => {
  const numericValue = text.replace(/[^0-9.]/g, "");

  const parts = numericValue.split(".");
  if (parts.length > 2) {
    return "";
  }

  if (parts[1] && parts[1].length > 2) {
    return "";
  }

  return numericValue;
}; 
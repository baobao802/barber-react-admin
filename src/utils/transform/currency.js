export default function formatCurrency(number, option) {
  const { symbol, locales } = option ?? { symbol: 'VND', locales: 'vi-VN' };
  if (number) {
    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: symbol,
    }).format(number);
  }

  return number;
}

export const formatNumber = (ccNumber) => {
  const parts = [];
  const formattedNumber = ccNumber.replace(/\s/g, '');

  for (let i = 0; i < formattedNumber.length; i += 4) {
    parts.push(formattedNumber.substring(i, i + 4));
  }

  return parts.join(' ');
};

export const formatHolder = (ccHolder) => ccHolder.toUpperCase();

export const formatDate = (ccDate) => {
  const parts = [];
  const formattedNumber = ccDate.replace(/[\s\\]/g, '');

  for (let i = 0; i < formattedNumber.length; i += 2) {
    parts.push(formattedNumber.substring(i, i + 2));
  }

  return parts.join(' \\ ');
};

var getClaims = role => {
  switch (role) {
    case 'salesManager':
      return ['accessSales'];

    case 'purchaseManager':
      return ['accessPurchase'];

    default:
      return [];
  }
};
export { getClaims };

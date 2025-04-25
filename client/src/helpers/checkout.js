// Copyright 2025 LearnChef3000

export const getCartTotal = cart =>
  Number.parseFloat(
    cart?.reduce((acc, item) => (acc += item.count * item.discount_price), 0) ||
      0,
  ).toFixed(2);

export const getCartItemTotal = cart =>
  cart?.reduce((acc, item) => (acc += item.count), 0) || 0;

export const getCartPayload = cart => {
  let result = cart?.reduce((acc, item) => {
    acc?.push({
      id: item.id,
      countRequested: item.count,
    });
    return acc;
  }, []);

  return result || [];
};

export default { getCartTotal, getCartPayload, getCartItemTotal };

export const addToBasket = (itemId) => {
  if (!itemId) {
    return;
  }

  let currentBasketItems = JSON.parse(localStorage.getItem('basket'));
  let itemNotInBasket = true;

  if (!currentBasketItems) {
    currentBasketItems = [];
  }

  currentBasketItems = currentBasketItems.map((item) => {
    const updatedItem = item;

    if (updatedItem.planId === itemId) {
      updatedItem.count += 1;
      itemNotInBasket = false;
    }

    return updatedItem;
  });

  if (itemNotInBasket) {
    currentBasketItems.push({ count: 1, planId: itemId, isEsim: true });
  }

  localStorage.setItem('basket', JSON.stringify(currentBasketItems));
};

export const deleteFromBasket = (itemId) => {
  if (!itemId) {
    return;
  }

  const currentBasketItems = JSON.parse(localStorage.getItem('basket'));

  let indexToDelete;
  for (let i = 0; i < currentBasketItems.length; i += 1) {
    if (currentBasketItems[i].planId === itemId) {
      indexToDelete = i;
      break;
    }
  }

  currentBasketItems.splice(indexToDelete, 1);

  localStorage.setItem('basket', JSON.stringify(currentBasketItems));
};

export const getBasketItems = () => {
  let basketItems = localStorage.getItem('basket') || [];

  if (!Array.isArray(basketItems)) {
    basketItems = JSON.parse(basketItems);
  }

  return basketItems.reduce((basket, basketItem) => {
    if (basketItem.planId) {
      basket.push(basketItem);
    }

    return basket;
  }, []);
};

export const getBasketItem = (itemId) => JSON
  .parse(localStorage.getItem('basket'))
  .filter((item) => item.planId === itemId)[0];

export const updateBasket = (itemId, amount, isEsim = true) => {
  let currentBasketItems = JSON.parse(localStorage.getItem('basket'));

  currentBasketItems = currentBasketItems.map((item) => {
    const updatedItem = item;
    if (updatedItem.planId === itemId) {
      updatedItem.count = amount;
      updatedItem.isEsim = isEsim;
    }
    return updatedItem;
  });

  localStorage.setItem('basket', JSON.stringify(currentBasketItems));
};

export const countPrice = (plans, basketItems) => {
  let price = 0;
  const prices = {};
  plans.forEach((item) => { prices[item.id] = item.costBuyPlan; });

  const basketItemsIds = basketItems.map((item) => item.planId);
  basketItemsIds.forEach((id) => {
    price += prices[id] * getBasketItem(id).count;
  });

  return price || 0;
};

export const countTotalPlans = () => getBasketItems()
  .reduce((total, item) => total + item.count, 0);

export const hasPlasticSim = () => getBasketItems().filter((item) => !item.isEsim).length;

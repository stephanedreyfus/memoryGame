const memory = require('./memory');

describe("Test DOM interraction", () => {
  test("Card list is shuffled (style: order is added)", () => {
    const cardOrder = parseInt(cards[0].style.getPropertyValue(order));
    expect(cards.length).toEqual(24);
    expect(cards[0].style).toContain("order");
    expect(cardOrder).toBeLessThanOrEqual(99);
    expect(cardOrder).toBeGreaterThanOrEqual(0);
  });

  xtest ("Click adds 'flip' class to first clicked card", () => {

  });
});
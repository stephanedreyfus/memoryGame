const memory = require('./memory');
console.log("Are we importing memory.js?", memory);

test("We can see and use add function", () => {
  expect(add(3, 7).toEqual(10));
});

describe("Test DOM interraction", () => {
  beforeEach(() => {
    memoryGame();
  });

  test("Card list is shuffled (style: order is added)", () => {
    const cards = document.querySelectorAll('.memory-card');
    console.log("What is cards? @@@@@@@@@@@@@@@", cards);

    const cardOrder = parseInt(cards[0].style.getPropertyValue(order));
    expect(cards.length).toEqual(24);
    expect(cards[0].style).toContain("order");
    expect(cardOrder).toBeLessThanOrEqual(99);
    expect(cardOrder).toBeGreaterThanOrEqual(0);
  });

  xtest ("Click adds 'flip' class to first clicked card", () => {

  });
});
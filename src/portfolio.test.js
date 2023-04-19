const portfolioImp = require('./portfolio')

let portfolio = null

beforeEach(() => {
    portfolio = new portfolioImp.StockPortfolio()
})

test('2.1 -- new portfolio is empty', () => {
    expect(portfolio.stocks.size).toBe(0)
})

test('2.2 -- portfolio answers that it is empty', () => {
    expect(portfolio.isEmpty()).toBeTruthy()
})

test('2.2 -- portfolio answers that it is not empty', () => {
    portfolio.stocks.set("GME", 5)

    expect(portfolio.isEmpty()).toBeFalsy()
})

test('2.3 -- portfolio counts the unique number of stocks', () => {
    portfolio.stocks.set("GME", 5)
    portfolio.stocks.set("RBLX", 10)

    expect(portfolio.uniqueStocks()).toBe(2)
})

test('2.4 -- make a purchase of a new stock', () => {
    portfolio.makePurchase("RBLX", 5)

    expect(portfolio.stocks.get("RBLX")).toBe(5)
})

test('2.4 -- make an additional purchase of a stock you already have', () => {
    portfolio.makePurchase("RBLX", 5)
    portfolio.makePurchase("RBLX", 3)

    expect(portfolio.stocks.get("RBLX")).toBe(8)
})

test('2.5 -- sell shares', () => {
    portfolio.makePurchase("RBLX", 5)
    portfolio.makeSale("RBLX", 3)

    expect(portfolio.stocks.get("RBLX")).toBe(2)
})

// test('2.5 -- sell more shares than you have available', () => {
//     portfolio.makePurchase("RBLX", 3)
//     portfolio.makeSale("RBLX", 5)
//
//     expect(portfolio.stocks.get("RBLX")).toBe(undefined)
// })

// test('2.5 -- sell shares when you have no shares', () => {
//     portfolio.makeSale("RBLX", 5)
//
//     expect(portfolio.stocks.get("RBLX")).toBe(undefined)
// })

test('2.6 -- return the number of shares of a stock (owned)', () => {
    portfolio.makePurchase("RBLX", 5)

    expect(portfolio.getShares("RBLX")).toBe(5)
})

test('2.6 -- return the number of shares of stock (unowned)', () => {
    expect(portfolio.getShares("RBLX")).toBe(0)
})

test('2.7 -- only owned stocks are in the portfolio', () => {
    portfolio.makePurchase("RBLX", 5)
    portfolio.makePurchase("GME", 3)
    portfolio.makeSale("RBLX", 5)

    expect(portfolio.stocks.keys()).toContain("GME")
    expect(portfolio.stocks.keys()).not.toContain("RBLX")
})

test('2.8 -- it should not be possible to sell too many shares', () => {
    expect(() => portfolio.makeSale("RBLX", 3)).toThrowError("ShareSaleException")
})
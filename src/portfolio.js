class StockPortfolio {
    constructor() {
        this.stocks = new Map()
    }

    isEmpty() { return this.stocks.size === 0}
    uniqueStocks() { return this.stocks.size }

    makePurchase(stock, shares) {
        const existing = this.stocks.get(stock) || 0

        this.stocks.set(stock, existing + shares)
    }

    makeSale(stock, shares) {
        const existing = this.stocks.get(stock) || 0

        if (existing < shares) {
            throw new Error("ShareSaleException")
        } else if (existing === shares) {
            this.stocks.delete(stock)
        } else {
            this.stocks.set(stock, existing - shares)
        }
    }

    getShares(stock) {
        return this.stocks.get(stock) || 0
    }
}

exports.StockPortfolio = StockPortfolio
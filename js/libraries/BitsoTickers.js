define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    var BitsoTickers = {
        bitsoTickerUrl: 'https://api.bitso.com/v3/ticker/?book=',
        bitsoBTCtickerBook: 'btc_mxn',
        bitsoETHtickerBook: 'eth_mxn',
        bitsoETHBTCtickerBook: 'eth_btc',
        tickers: ko.observable(),

        getTickers: function () {
            this.getBitsoBTCticker();
            this.getBitsoETHticker();
            this.getBitsoETHBTCticker();
        },

        savePayload: function (payload, book) {
            var tick = this.tickers();

            if (tick == undefined) {
                tick = {
                    BTC: undefined,
                    ETH: undefined,
                    ETHBTC: undefined
                }
            }
            if (book == 'BTC')
                tick.BTC = payload
            else if (book == 'ETH')
                tick.ETH = payload
            else if (book == 'ETHBTC')
                tick.ETHBTC = payload

            this.tickers(tick);
        },

        getBitsoBTCticker: function () {
            var self = this;

            $.ajax({
                cache: false,
                url: self.bitsoTickerUrl + self.bitsoBTCtickerBook,
                dataType: "json",
                success: function (data) {
                    self.savePayload(data.payload, 'BTC')
                }
            });
        },

        getBitsoETHticker: function () {
            var self = this;
            $.ajax({
                cache: false,
                url: self.bitsoTickerUrl + self.bitsoETHtickerBook,
                dataType: "json",
                success: function (data) {
                    self.savePayload(data.payload, 'ETH')
                }
            });
        },

        getBitsoETHBTCticker: function () {
            var self = this;
            $.ajax({
                cache: false,
                url: self.bitsoTickerUrl + self.bitsoETHBTCtickerBook,
                dataType: "json",
                success: function (data) {
                    self.savePayload(data.payload, 'ETHBTC')
                }
            });
        }


    };
    return BitsoTickers;
});


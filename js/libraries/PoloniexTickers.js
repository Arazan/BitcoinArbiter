define(['ojs/ojcore', 'knockout', 'libs/autobahn/autobahn.min'
], function (oj, ko, autobahn) {
    var BitfinexTickers = {
        connection: new autobahn.Connection({
            url: "wss://api.poloniex.com",
            realm: "realm1"
        }),

        tickers: ko.observable(),

        connectToServer: function () {
            var self = this;

            self.connection.onopen = function (session) {
                self.onOpen(session);
            };

            self.connection.onclose = function () {
                console.log("Websocket connection closed");
            };

            self.connection.open();
        },
        
        savePayload: function (data, book) {
            
            
            var tick = this.tickers();
            if (tick === undefined) {
                tick = {
                    BTC: undefined,
                    ETH: undefined,
                    ETHBTC: undefined
                };
            }


            var object = {
                last: parseFloat(data[1]).toFixed(2),
                bid: parseFloat(data[3]).toFixed(2),
                low: parseFloat(data[9]).toFixed(2),
                volume: parseFloat(data[5]).toFixed(2),
                ask: parseFloat(data[2]).toFixed(2),
                high: parseFloat(data[8]).toFixed(2),
                spread: parseFloat((((data[2] / data[3])) - 1) * 100).toFixed(2)
            };
            

            if (book === 'BTC')
                tick.BTC = object;
            else if (book === 'ETH')
                tick.ETH = object;
            else if (book === 'ETHBTC')
                tick.ETHBTC = object;


            this.tickers(tick);
        },

        onOpen: function (session) {
            var self = this;
            console.log("Connected");

            function tickerEvent(data, kwargs) {                
                if (data[0] === 'USDT_BTC') {
                    self.savePayload(data, 'BTC');
                } else if (data[0] === 'USDT_ETH') {
                    self.savePayload(data, 'ETH');
                } else if (data[0] === 'BTC_ETH') {
                    self.savePayload(data, 'ETHBTC');
                }
            }

            session.subscribe('ticker', tickerEvent);

        }
    };
    return BitfinexTickers;
});


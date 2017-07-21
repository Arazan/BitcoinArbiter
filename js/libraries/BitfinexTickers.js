define(['ojs/ojcore', 'knockout' 
], function (oj, ko) {
    var BitfinexTickers = {
        wsUri: "wss://api.bitfinex.com/ws",
        chanIdBTCUSD: 0,
        chanIdETHUSD: 0,
        chanIdETHBTC: 0,
        tickers: ko.observable(),

        connectToServer: function () {
            var self = this
            //console.log("Connect to Server");
            websocket = new WebSocket(self.wsUri);
            websocket.onopen = function (evt) {
                self.onOpen(evt)
            };
            websocket.onclose = function (evt) {
                self.onClose(evt)
            };
            websocket.onmessage = function (evt) {
                self.onMessage(evt)
            };
            websocket.onerror = function (evt) {
                self.onError(evt)
            };
        },

        savePayload: function (data, book) {
            var tick = this.tickers();

            if (tick == undefined) {
                tick = {
                    BTC: undefined,
                    ETH: undefined,
                    ETHBTC: undefined
                }
            }

            var object = {
                last:   parseFloat(data[7]).toFixed(2),
                bid:    data[1],
                low:    data[10],
                volume: parseFloat(data[8]).toFixed(2),
                ask:    data[3],
                high:   data[9]
            };

            if (book == 'BTC')
                tick.BTC = object
            else if (book == 'ETH')
                tick.ETH = object
            else if (book == 'ETHBTC')
                tick.ETHBTC = object

            this.tickers(tick);
        },

        onOpen: function (evt) {
            //console.log("Connected");
            websocket.send('{"event":"subscribe","channel":"ticker","pair":"BTCUSD"}');
            websocket.send('{"event":"subscribe","channel":"ticker","pair":"ETHUSD"}');
            websocket.send('{"event":"subscribe","channel":"ticker","pair":"ETHBTC"}');
        },
        onClose: function (evt) {
            //console.log("Disconnected");
        },

        onMessage: function (evt) {
            var self = this;
            var data = JSON.parse(evt.data);
            if (data.event == 'subscribed') {
                switch (data.pair) {
                    case 'BTCUSD':
                        //console.log('subscribed to BTCUSD');
                        self.chanIdBTCUSD = data.chanId;
                        break;
                    case 'ETHUSD':
                        //console.log('subscribed to ETHUSD');
                        self.chanIdETHUSD = data.chanId;
                        break;
                    case 'ETHBTC':
                        //console.log('subscribed to ETHBTC');
                        self.chanIdETHBTC = data.chanId;
                        break;
                }
            }

            if (data[1] != 'hb') {
                switch (data[0]) {
                    case self.chanIdBTCUSD:
                        self.savePayload(data, 'BTC');
                        break;
                    case self.chanIdETHUSD:
                        self.savePayload(data, 'ETH');
                        break;
                    case self.chanIdETHBTC:
                        self.savePayload(data, 'ETHBTC');
                        break;
                }
            }

        },
        onError: function (evt) {
            console.log("ERROR: " + evt.data);
        },
    };
    return BitfinexTickers;
});


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ticker module
 */
define(['ojs/ojcore', 'knockout', 'libraries/Utilities', 'libraries/etherminerModel'
], function (oj, ko, util, miner) {
    /**
     * The view model for the main content view template
     */
    function tickerContentViewModel() {
        var self = this;
        var wsUri = "wss://api.bitfinex.com/ws";
        var chanIdBTCUSD = 0;
        var chanIdETHUSD = 0;
        var chanIdETHBTC = 0;
                                
        self.bitsoBTCtickerURL = 'https://api.bitso.com/v3/ticker/?book=btc_mxn';
        self.bitsoETHtickerURL = 'https://api.bitso.com/v3/ticker/?book=eth_mxn';
        self.bitsoETHBTCtickerURL = 'https://api.bitso.com/v3/ticker/?book=eth_btc';

        self.bitfinexBTCtickerURL = 'https://api.bitfinex.com/v1/pubticker/BTCUSD';
        self.bitfinexETHtickerURL = 'https://api.bitfinex.com/v1/pubticker/ETHUSD';
        self.bitfinexBTCETHtickerURL = 'https://api.bitfinex.com/v1/pubticker/ETHBTC';
        self.refreshRate = 12000;
        self.lastNotificationSent = 0;
        self.notificationDelay = 600000;
        self.arbitrageGap = 2000.00


        self.bitsoBTClast = ko.observable(0);
        self.bitsoBTCbid = ko.observable(0);
        self.bitsoBTClow = ko.observable(0);
        self.bitsoBTCvolume = ko.observable(0);
        self.bitsoBTCask = ko.observable(0);
        self.bitsoBTChigh = ko.observable(0);
        self.bitsoBTCspread = ko.pureComputed(function () {
            return parseFloat((((self.bitsoBTCask() / self.bitsoBTCbid())) - 1) * 100).toFixed(2);
        });


        self.bitsoETHlast = ko.observable(0);
        self.bitsoETHbid = ko.observable(0);
        self.bitsoETHlow = ko.observable(0);
        self.bitsoETHvolume = ko.observable(0);
        self.bitsoETHask = ko.observable(0);
        self.bitsoETHhigh = ko.observable(0);
        self.bitsoETHspread = ko.pureComputed(function () {
            return parseFloat((((self.bitsoETHask() / self.bitsoETHbid())) - 1) * 100).toFixed(2);
        });

        self.bitsoETHBTClast = ko.observable(0);
        self.bitsoETHBTCbid = ko.observable(0);
        self.bitsoETHBTClow = ko.observable(0);
        self.bitsoETHBTCvolume = ko.observable(0);
        self.bitsoETHBTCask = ko.observable(0);
        self.bitsoETHBTChigh = ko.observable(0);
        self.bitsoETHBTCspread = ko.pureComputed(function () {
            return parseFloat((((self.bitsoETHBTCask() / self.bitsoETHBTCbid())) - 1) * 100).toFixed(2);
        });

        self.bitfinexBTClast = ko.observable(0);
        self.bitfinexBTCbid = ko.observable(0);
        self.bitfinexBTClow = ko.observable(0);
        self.bitfinexBTCvolume = ko.observable(0);
        self.bitfinexBTCask = ko.observable(0);
        self.bitfinexBTChigh = ko.observable(0);
        self.bitfinexBTCspread = ko.pureComputed(function () {
            return parseFloat((((self.bitfinexBTCask() / self.bitfinexBTCbid())) - 1) * 100).toFixed(2);
        });


        self.bitfinexETHlast = ko.observable(0);
        self.bitfinexETHbid = ko.observable(0);
        self.bitfinexETHlow = ko.observable(0);
        self.bitfinexETHvolume = ko.observable(0);
        self.bitfinexETHask = ko.observable(0);
        self.bitfinexETHhigh = ko.observable(0);
        self.bitfinexETHspread = ko.pureComputed(function () {
            return parseFloat((((self.bitfinexETHask() / self.bitfinexETHbid())) - 1) * 100).toFixed(2);
        });

        self.bitfinexETHBTClast = ko.observable(0);
        self.bitfinexETHBTCbid = ko.observable(0);
        self.bitfinexETHBTClow = ko.observable(0);
        self.bitfinexETHBTCvolume = ko.observable(0);
        self.bitfinexETHBTCask = ko.observable(0);
        self.bitfinexETHBTChigh = ko.observable(0);
        self.bitfinexETHBTCspread = ko.pureComputed(function () {
            //console.log()
            return parseFloat((((self.bitfinexETHBTCask() / self.bitfinexETHBTCbid())) - 1) * 100).toFixed(2);
        });


        self.arbitrage = ko.pureComputed(function () {
            var arb = parseFloat(((self.bitfinexBTCbid() / self.bitfinexETHask()) * self.bitsoETHbid()) - self.bitsoBTCask()).toFixed(2);
            if (!isNaN(arb) && isFinite(arb)) {
                if ((arb >= self.arbitrageGap) &&
                        ((Date.now()) - self.lastNotificationSent) > self.notificationDelay) {
                    self.lastNotificationSent = Date.now();
                    self.sendNotification(arb);
                }
            }


            return arb;
        });


        self.arbitrage2 = ko.pureComputed(function () {
            var arb = parseFloat(((1 / self.bitfinexETHBTCask()) * self.bitsoETHbid()) - self.bitsoBTCask()).toFixed(2);
            if (!isNaN(arb) && isFinite(arb)) {
                if ((arb >= self.arbitrageGap) &&
                        ((Date.now()) - self.lastNotificationSent) > self.notificationDelay) {
                    self.lastNotificationSent = Date.now();
                    self.sendNotification(arb);
                }
            }
            return arb;
        });

        

        self.handleActivated = function (info) {
            self.getData();
        };

        self.initialize = function () {
            self.getData();
        };

        self.getData = function () {
            self.getBitsoBTCticker();
            self.getBitsoETHticker();
            self.getBitsoETHBTCticker();
            //self.getBitfinexBTCticker();
            //self.getBitfinexETHticker();
            //self.getBitfinexETHBTCticker();

            setTimeout(function () {
                self.getData();
            }, self.refreshRate);

        }




        self.getBitsoBTCticker = function () {
            $.ajax({
                cache: false,
                url: self.bitsoBTCtickerURL,
                dataType: "json",
                success: function (data) {
                    var payload = data.payload;
                    self.bitsoBTClast(payload.last);
                    self.bitsoBTCbid(payload.bid);
                    self.bitsoBTClow(payload.low);
                    self.bitsoBTCvolume(parseFloat(payload.volume).toFixed(2));
                    self.bitsoBTCask(payload.ask);
                    self.bitsoBTChigh(payload.high);

                }
            });
        }

        self.getBitsoETHticker = function () {
            $.ajax({
                cache: false,
                url: self.bitsoETHtickerURL,
                dataType: "json",
                success: function (data) {
                    var payload = data.payload;
                    self.bitsoETHlast(payload.last);
                    self.bitsoETHbid(payload.bid);
                    self.bitsoETHlow(payload.low);
                    self.bitsoETHvolume(parseFloat(payload.volume).toFixed(2));
                    self.bitsoETHask(payload.ask);
                    self.bitsoETHhigh(payload.high);

                }
            });
        }

        self.getBitsoETHBTCticker = function () {
            $.ajax({
                cache: false,
                url: self.bitsoETHBTCtickerURL,
                dataType: "json",
                success: function (data) {
                    var payload = data.payload;
                    self.bitsoETHBTClast(payload.last);
                    self.bitsoETHBTCbid(payload.bid);
                    self.bitsoETHBTClow(payload.low);
                    self.bitsoETHBTCvolume(parseFloat(payload.volume).toFixed(2));
                    self.bitsoETHBTCask(payload.ask);
                    self.bitsoETHBTChigh(payload.high);

                }
            });
        }

        self.getBitfinexBTCticker = function () {
            $.ajax({
                cache: false,
                url: self.bitfinexBTCtickerURL,
                dataType: "json",
                success: function (payload) {
                    self.bitfinexBTClast(payload.last_price);
                    self.bitfinexBTCbid(payload.bid);
                    self.bitfinexBTClow(payload.low);
                    self.bitfinexBTCvolume(parseFloat(payload.volume).toFixed(2));
                    self.bitfinexBTCask(payload.ask);
                    self.bitfinexBTChigh(payload.high);

                }
            });
        }

        self.getBitfinexETHticker = function () {
            $.ajax({
                cache: false,
                url: self.bitfinexETHtickerURL,
                dataType: "json",
                success: function (payload) {
                    self.bitfinexETHlast(payload.last_price);
                    self.bitfinexETHbid(payload.bid);
                    self.bitfinexETHlow(payload.low);
                    self.bitfinexETHvolume(parseFloat(payload.volume).toFixed(2));
                    self.bitfinexETHask(payload.ask);
                    self.bitfinexETHhigh(payload.high);

                }
            });
        }

        self.getBitfinexETHBTCticker = function () {
            $.ajax({
                cache: false,
                url: self.bitfinexBTCETHtickerURL,
                dataType: "json",
                success: function (payload) {
                    self.bitfinexETHBTClast(payload.last_price);
                    self.bitfinexETHBTCbid(payload.bid);
                    self.bitfinexETHBTClow(payload.low);
                    self.bitfinexETHBTCvolume(parseFloat(payload.volume).toFixed(2));
                    self.bitfinexETHBTCask(payload.ask);
                    self.bitfinexETHBTChigh(payload.high);

                }
            });
        }

        self.sendNotification = function (arb) {
            if (!util.isMobile()) {
                if (Notification.permission !== "granted")
                    Notification.requestPermission();
                else {
                    var notification = new Notification('Bitcoin Arbiter', {
                        icon: 'js/css/btc_512.png',
                        body: "Arbitrage Oportunity of $ " + arb + " per btc"
                    });
                }
            }
        };


        self.connectToServer = function () {
            console.log("Connect to Server");
            websocket = new WebSocket(wsUri);
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
        };

        self.onOpen = function (evt) {
            console.log("Connected");
            websocket.send('{"event":"subscribe","channel":"ticker","pair":"BTCUSD"}');
            websocket.send('{"event":"subscribe","channel":"ticker","pair":"ETHUSD"}');
            websocket.send('{"event":"subscribe","channel":"ticker","pair":"ETHBTC"}');
        };

        self.onClose = function (evt) {
            console.log("Disconnected");
        };

        self.onMessage = function (evt) {
            var data = JSON.parse(evt.data);
            if (data.event == 'subscribed') {
                switch (data.pair) {
                    case 'BTCUSD':
                        console.log('subscribed to BTCUSD');
                        chanIdBTCUSD = data.chanId;
                        break;
                    case 'ETHUSD':
                        console.log('subscribed to ETHUSD');
                        chanIdETHUSD = data.chanId;
                        break;
                    case 'ETHBTC':
                        console.log('subscribed to ETHBTC');
                        chanIdETHBTC = data.chanId;
                        break;
                }
            }

            if (data[1] != 'hb') {
                switch (data[0]) {
                    case chanIdBTCUSD:
                        self.bitfinexBTClast(parseFloat(data[7]).toFixed(2));
                        self.bitfinexBTCbid(data[1]);
                        self.bitfinexBTClow(data[10]);
                        self.bitfinexBTCvolume(parseFloat(data[8]).toFixed(2));
                        self.bitfinexBTCask(data[3]);
                        self.bitfinexBTChigh(data[9]);
                        break;
                    case chanIdETHUSD:
                        self.bitfinexETHlast(parseFloat(data[7]).toFixed(2));
                        self.bitfinexETHbid(data[1]);
                        self.bitfinexETHlow(data[10]);
                        self.bitfinexETHvolume(parseFloat(data[8]).toFixed(2));
                        self.bitfinexETHask(data[3]);
                        self.bitfinexETHhigh(data[9]);
                        break;
                    case chanIdETHBTC:
                        self.bitfinexETHBTClast(data[7]);
                        self.bitfinexETHBTCbid(data[1]);
                        self.bitfinexETHBTClow(data[10]);
                        self.bitfinexETHBTCvolume(parseFloat(data[8]).toFixed(2));
                        self.bitfinexETHBTCask(data[3]);
                        self.bitfinexETHBTChigh(data[9]);
                        break;
                }
            }

        };

        self.onError = function (evt) {
            console.log("ERROR: " + evt.data);
        };





        //Connect to bitfinex via websockets
        self.connectToServer();
    }

    return tickerContentViewModel;
});

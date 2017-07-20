/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ticker module
 */
define(['ojs/ojcore', 'knockout', 'libraries/Utilities', 'libraries/BitsoTickers', 'libraries/BitfinexTickers'
], function (oj, ko, util, bitso, bitfinex) {
    /**
     * The view model for the main content view template
     */
    function tickerContentViewModel() {
        var self = this;

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


        // Get latest values from bitso
        bitso.tickers.subscribe(function (payload) {

            if (payload.BTC != undefined) {
                self.bitsoBTClast(payload.BTC.last);
                self.bitsoBTCbid(payload.BTC.bid);
                self.bitsoBTClow(payload.BTC.low);
                self.bitsoBTCvolume(parseFloat(payload.BTC.volume).toFixed(2));
                self.bitsoBTCask(payload.BTC.ask);
                self.bitsoBTChigh(payload.BTC.high);
            }

            if (payload.ETH != undefined) {
                self.bitsoETHlast(payload.ETH.last);
                self.bitsoETHbid(payload.ETH.bid);
                self.bitsoETHlow(payload.ETH.low);
                self.bitsoETHvolume(parseFloat(payload.ETH.volume).toFixed(2));
                self.bitsoETHask(payload.ETH.ask);
                self.bitsoETHhigh(payload.ETH.high);
            }

            if (payload.ETHBTC) {
                self.bitsoETHBTClast(payload.ETHBTC.last);
                self.bitsoETHBTCbid(payload.ETHBTC.bid);
                self.bitsoETHBTClow(payload.ETHBTC.low);
                self.bitsoETHBTCvolume(parseFloat(payload.ETHBTC.volume).toFixed(2));
                self.bitsoETHBTCask(payload.ETHBTC.ask);
                self.bitsoETHBTChigh(payload.ETHBTC.high);
            }

        });

        bitfinex.tickers.subscribe(function (payload) {

            if (payload.BTC != undefined) {
                self.bitfinexBTClast(payload.BTC.last);
                self.bitfinexBTCbid(payload.BTC.bid);
                self.bitfinexBTClow(payload.BTC.low);
                self.bitfinexBTCvolume(parseFloat(payload.BTC.volume).toFixed(2));
                self.bitfinexBTCask(payload.BTC.ask);
                self.bitfinexBTChigh(payload.BTC.high);
            }

            if (payload.ETH != undefined) {
                self.bitfinexETHlast(payload.ETH.last);
                self.bitfinexETHbid(payload.ETH.bid);
                self.bitfinexETHlow(payload.ETH.low);
                self.bitfinexETHvolume(parseFloat(payload.ETH.volume).toFixed(2));
                self.bitfinexETHask(payload.ETH.ask);
                self.bitfinexETHhigh(payload.ETH.high);
            }

            if (payload.ETHBTC != undefined) {
                self.bitfinexETHBTClast(payload.ETHBTC.last);
                self.bitfinexETHBTCbid(payload.ETHBTC.bid);
                self.bitfinexETHBTClow(payload.ETHBTC.low);
                self.bitfinexETHBTCvolume(parseFloat(payload.ETHBTC.volume).toFixed(2));
                self.bitfinexETHBTCask(payload.ETHBTC.ask);
                self.bitfinexETHBTChigh(payload.ETHBTC.high);
            }
        });


        self.handleActivated = function (info) {
            self.getData();
        };

        self.initialize = function () {
            self.getData();
        };

        self.getData = function () {

            bitso.getTickers();
            setTimeout(function () {
                self.getData();
            }, self.refreshRate);


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

        bitfinex.connectToServer();

    }

    return tickerContentViewModel;
});

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ticker module
 */
define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function tickerContentViewModel() {
        var self = this;

        self.bitsoBTClast = ko.observable(0);
        self.bitsoBTCbid = ko.observable(0);
        self.bitsoBTClow = ko.observable(0);
        self.bitsoBTCvolume = ko.observable(0);
        self.bitsoBTCask = ko.observable(0);
        self.bitsoBTChigh = ko.observable(0);
        self.bitsoBTCspread = ko.pureComputed(function () {
            //console.log()
            return parseFloat((((self.bitsoBTCask() / self.bitsoBTCbid())) - 1) * 100).toFixed(2);
        });


        self.bitsoETHlast = ko.observable(0);
        self.bitsoETHbid = ko.observable(0);
        self.bitsoETHlow = ko.observable(0);
        self.bitsoETHvolume = ko.observable(0);
        self.bitsoETHask = ko.observable(0);
        self.bitsoETHhigh = ko.observable(0);
        self.bitsoETHspread = ko.pureComputed(function () {
            //console.log()
            return parseFloat((((self.bitsoETHask() / self.bitsoETHbid())) - 1) * 100).toFixed(2);
        });

        self.bitfinexBTClast = ko.observable(0);
        self.bitfinexBTCbid = ko.observable(0);
        self.bitfinexBTClow = ko.observable(0);
        self.bitfinexBTCvolume = ko.observable(0);
        self.bitfinexBTCask = ko.observable(0);
        self.bitfinexBTChigh = ko.observable(0);
        self.bitfinexBTCspread = ko.pureComputed(function () {
            //console.log()
            return parseFloat((((self.bitfinexBTCask() / self.bitfinexBTCbid())) - 1) * 100).toFixed(2);
        });


        self.bitfinexETHlast = ko.observable(0);
        self.bitfinexETHbid = ko.observable(0);
        self.bitfinexETHlow = ko.observable(0);
        self.bitfinexETHvolume = ko.observable(0);
        self.bitfinexETHask = ko.observable(0);
        self.bitfinexETHhigh = ko.observable(0);
        self.bitfinexETHspread = ko.pureComputed(function () {
            //console.log()
            return parseFloat((((self.bitfinexETHask() / self.bitfinexETHbid())) - 1) * 100).toFixed(2);
        });

        self.bitsoBTCtickerURL = 'https://api.bitso.com/v3/ticker/?book=btc_mxn';
        self.bitsoETHtickerURL = 'https://api.bitso.com/v3/ticker/?book=eth_mxn';

        self.bitfinexBTCtickerURL = 'https://api.bitfinex.com/v1/pubticker/BTCUSD';
        self.bitfinexETHtickerURL = 'https://api.bitfinex.com/v1/pubticker/ETHUSD';

        self.handleActivated = function (info) {
            self.getData();
        };

        self.initialize = function () {
            self.getData();
        };

        self.getData = function () {
            self.getBitsoBTCticker();
            self.getBitsoETHticker();
            self.getBitfinexBTCticker();
            self.getBitfinexETHticker();
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
    }

    return tickerContentViewModel;
});

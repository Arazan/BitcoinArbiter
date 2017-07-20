define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    var BitfinexTickers = {
        bitsoTickerUrl: 'https://api.bitso.com/v3/ticker/?book=',
        bitsoBTCtickerBook: 'btc_mxn',
        bitsoETHtickerBook: 'eth_mxn',
        bitsoETHBTCtickerBook: 'eth_btc',
        tickers: ko.observable(),



    };
    return BitfinexTickers;
});


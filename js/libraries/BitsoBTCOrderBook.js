define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    function BitsoBTCOrderBook() {
        var self = this;

        self.resourceUrl = 'https://api-dev.bitso.com/v3/order_book/?book=btc_mxn';
        self.orders = ko.observable();
        // Create a movie collection:
        self.getOrderBook = function (fn) {
            var x = fn;
            $.getJSON(self.resourceUrl).
                    then(function (orderBook) {
                        x(orderBook);
                    });
        };
    }
    ;
    return BitsoBTCOrderBook;
});



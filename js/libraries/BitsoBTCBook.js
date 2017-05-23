define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    function BitsoBTCBook(){
        var self = this;
        
        //self.resourceUrl = 'https://api-dev.bitso.com/v3/order_book/?book=btc_mxn';
        self.resourceUrl = 'https://api.bitso.com/v3/trades/?book=btc_mxn';
        
        // Create a single movie instance:
        self.createBookModel = function () {
            var Movie = oj.Model.extend({
                urlRoot: this.resourceUrl, 
                idAttribute: "tid"
            });
            return new Movie();
        };
        
        // Create a movie collection:
        self.createBookCollection = function () {
            var Operations = oj.Collection.extend({
                url: this.resourceUrl, 
                model: this.createBookModel()
            });
            return new Operations();
        };
    };
    return BitsoBTCBook;
});



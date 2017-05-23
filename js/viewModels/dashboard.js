/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'libraries/BitsoBTCOrderBook', 'ojs/ojmodel', 'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource',
    'ojs/ojinputnumber'],
        function (oj, ko, $, BitsoBTCOrderBook) {

            function DashboardViewModel() {
                var self = this;

                self.fetchSize = ko.observable(5);
                self.usdTOmxnExchange = ko.observable();
                self.refreshRate = 5;
                                            

                self.BitsoOBAsksDataSource = ko.observable();
                self.BitsoOBBidsDataSource = ko.observable();
                self.BitsoOrderBookAsks = ko.observableArray();
                self.BitsoOrderBookBids = ko.observableArray();
                
                self.BitsoETHAsksDataSource = ko.observable();
                self.BitsoETHBidsDataSource = ko.observable();
                self.BitsoETHOrderBookAsks = ko.observableArray();
                self.BitsoETHOrderBookBids = ko.observableArray();           
                
                self.BitfinexOBAsksDataSource = ko.observable();
                self.BitfinexOBBidsDataSource = ko.observable();
                self.BitfinexOrderBookAsks = ko.observableArray();
                self.BitfinexOrderBookBids = ko.observableArray();
                
                self.BitfinexETHAsksDataSource = ko.observable();
                self.BitfinexETHBidsDataSource = ko.observable();
                self.BitfinexETHOrderBookAsks = ko.observableArray();
                self.BitfinexETHOrderBookBids = ko.observableArray();    
                
                self.BitsoBTCOrderBookURL = 'https://api-dev.bitso.com/v3/order_book/?book=btc_mxn';
                self.BitsoETHOrderBookURL = 'https://api-dev.bitso.com/v3/order_book/?book=eth_mxn';
                self.BFBTCOrderBookURL = 'https://api.bitfinex.com/v1/book/BTCUSD/?limit_bids=';
                self.BFETHCOrderBookURL = 'https://api.bitfinex.com/v1/book/ETHUSD/?limit_bids=';
                self.ExchangeRareURL = 'http://api.fixer.io/latest?base=USD&symbols=MXN';

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    //
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    //
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };


                self.getDataClick = function (data, event) {
                    self.getData();
                    return true;
                };


                self.getData = function () {
                    self.getBitsoBTCOrderBook();
                    self.getBitsoETHOrderBook();
                    
                    self.getBitfinexBTCOrderBook();
                    self.getBitfinexETHCOrderBook();
                    
                    self.getExchangeRate();
                };

                self.getBitsoETHOrderBook = function () {
                    $.ajax({
                        cache: false,
                        url: self.BitsoETHOrderBookURL,
                        dataType: "json",
                        success: function (orderBook) {
                            var ids = 0;

                            
                            self.BitsoETHOrderBookAsks([]);
                            self.BitsoETHAsksDataSource.reset([]);
                            self.BitsoETHOrderBookBids([]);
                            self.BitsoETHBidsDataSource.reset([]);                            

                            $.each(orderBook.payload.asks, function () {
                                self.BitsoETHOrderBookAsks.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });

                            ids = 0;
                            $.each(orderBook.payload.bids, function () {
                                self.BitsoETHOrderBookBids.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });
                        }
                    });

                    self.BitsoETHAsksDataSource = new oj.ArrayTableDataSource(self.BitsoETHOrderBookAsks, {idAttribute: 'id'});
                    self.BitsoETHBidsDataSource = new oj.ArrayTableDataSource(self.BitsoETHOrderBookBids, {idAttribute: 'id'});
                };
                
                self.getBitsoBTCOrderBook = function () {
                    $.ajax({
                        cache: false,
                        url: self.BitsoBTCOrderBookURL,
                        dataType: "json",
                        success: function (orderBook) {
                            var ids = 0;

                            
                            self.BitsoOrderBookAsks([]);
                            self.BitsoOBAsksDataSource.reset([]);
                            self.BitsoOrderBookBids([]);
                            self.BitsoOBBidsDataSource.reset([]);                            

                            $.each(orderBook.payload.asks, function () {
                                self.BitsoOrderBookAsks.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });

                            ids = 0;
                            $.each(orderBook.payload.bids, function () {
                                self.BitsoOrderBookBids.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });
                        }
                    });

                    self.BitsoOBAsksDataSource = new oj.ArrayTableDataSource(self.BitsoOrderBookAsks, {idAttribute: 'id'});
                    self.BitsoOBBidsDataSource = new oj.ArrayTableDataSource(self.BitsoOrderBookBids, {idAttribute: 'id'});
                };        
                
                self.getBitfinexBTCOrderBook = function () {
                    $.ajax({
                        cache: false,
                        url: self.BFBTCOrderBookURL+self.fetchSize()+'&limit_asks='+self.fetchSize(),
                        dataType: "json",
                        success: function (orderBook) {
                            var ids = 0;
                           

                            self.BitfinexOrderBookAsks([]);
                            self.BitfinexOBAsksDataSource.reset([]);
                            self.BitfinexOrderBookBids([]);
                            self.BitfinexOBBidsDataSource.reset([]);                          

                            $.each(orderBook.asks, function () {
                                self.BitfinexOrderBookAsks.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });

                            ids = 0;
                            $.each(orderBook.bids, function () {
                                self.BitfinexOrderBookBids.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });
                        }
                    });

                    self.BitfinexOBAsksDataSource = new oj.ArrayTableDataSource(self.BitfinexOrderBookAsks, {idAttribute: 'id'});
                    self.BitfinexOBBidsDataSource = new oj.ArrayTableDataSource(self.BitfinexOrderBookBids, {idAttribute: 'id'});
                };     
                
                self.getBitfinexETHCOrderBook = function () {
                    $.ajax({
                        cache: false,
                        url: self.BFETHCOrderBookURL+self.fetchSize()+'&limit_asks='+self.fetchSize(),
                        dataType: "json",
                        success: function (orderBook) {
                            var ids = 0;
                           

                            self.BitfinexETHOrderBookAsks([]);
                            self.BitfinexETHAsksDataSource.reset([]);
                            self.BitfinexETHOrderBookBids([]);
                            self.BitfinexETHBidsDataSource.reset([]);                          

                            $.each(orderBook.asks, function () {
                                self.BitfinexETHOrderBookAsks.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });

                            ids = 0;
                            $.each(orderBook.bids, function () {
                                self.BitfinexETHOrderBookBids.push({
                                    id: ids += 1,
                                    amount: parseFloat(this.amount).toFixed(4),
                                    price: "$" + this.price,
                                    total: parseFloat(this.price * this.amount).toFixed(2)
                                });
                                if (ids >= self.fetchSize())
                                    return false;
                            });
                        }
                    });

                    self.BitfinexETHAsksDataSource = new oj.ArrayTableDataSource(self.BitfinexETHOrderBookAsks, {idAttribute: 'id'});
                    self.BitfinexETHBidsDataSource = new oj.ArrayTableDataSource(self.BitfinexETHOrderBookBids, {idAttribute: 'id'});
                };     
                
                self.getExchangeRate = function(){
                    $.ajax({
                        url: self.ExchangeRareURL,
                        dataType: "json",
                        success: function (exchanges) {
                            self.usdTOmxnExchange(exchanges.rates.MXN);
                        }
                    });
                };
                


                self.initialize = function () {
                    self.getData();
                };


            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);

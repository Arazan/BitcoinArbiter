define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    var etherminerModel = {
        url: "https://ethermine.org/api/miner_new/a74a766e21641de255493ba499712d64cafb3d37",

        getStats: function () {
            $.ajax({
                cache: false,
                url: this.url,
                dataType: "json",
                success: function (data) {
                    return data;
                }
            });
        }
    };
    return etherminerModel;
});
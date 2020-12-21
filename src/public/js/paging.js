'use strict';

(function ($) {
    /*-------------------
	    Pagination
    --------------------- */

    $('#paging').pagination({
        dataSource: [1, 2, 3, 4, 5, 6, 7],
        pageSize: 5,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function(data, pagination) {
            var html = template(data);
            dataContainer.html(html);
            console.log(data);
        }
    })


})(jQuery);

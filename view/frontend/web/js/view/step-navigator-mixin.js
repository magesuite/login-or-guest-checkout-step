define(['underscore', 'Magento_Customer/js/model/customer'], function(
    _,
    customer
) {
    'use strict';

    return function(target) {
        return _.extend({}, target, {
            /**
             * @param {Object} step
             */
            navigateTo: function(code, scrollToElementId) {
                // Prevent users from going back to first step when they're logged in.
                if (code === 'login-or-guest' && customer.isLoggedIn()) {
                    return;
                }
                target.navigateTo(code, scrollToElementId);
            },
        });
    };
});

define([
    'jquery',
    'underscore',
    'ko',
    'uiComponent',
    'Magento_Checkout/js/model/step-navigator',
    'uiRegistry'
], function($, _, ko, Component, stepNavigator, registry) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'MageSuite_LoginOrGuestCheckoutStep/continue-as-guest',
            customerEmail: false
        },

        /** @inheritdoc */
        initialize: function() {
            this._super();

            var self = this;

            registry.async(
                'checkout.steps.login-or-guest.continue-as-guest.customer-email'
            )(function(element) {
                self.customerEmail = element;
            });
        },

        /**
         * @returns void
         */
        navigateToNextStep: function() {
            if (this.customerEmail) {
                if (!this.customerEmail.validateEmail()) {
                    // trigger validation by focusing in and out on field
                    this.customerEmail.emailFocused(true);
                    this.customerEmail.emailFocused(false); 
                } else {
                    stepNavigator.next();
                } 
            } else {
                stepNavigator.next();
            }
        },
    });
});

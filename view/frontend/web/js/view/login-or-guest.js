define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/model/quote',
    'jquery',
    'Magento_Customer/js/model/customer',
], function(ko, Component, _, stepNavigator, quote, $, customer) {
    'use strict';

    var $checkout = $('#checkout');

    return Component.extend({
        defaults: {
            template: 'MageSuite_LoginOrGuestCheckoutStep/login-or-guest',
        },

        isVisible: ko.observable(true),

        /**
         *
         * @returns {*}
         */
        initialize: function() {
            this._super();
            // register your step
            stepNavigator.registerStep(
                'login-or-guest',
                null,
                'Login',
                this.isVisible,
                _.bind(this.navigate, this),
                5
            );

            $checkout
                .addClass('cs-login-or-guest')
                .toggleClass('cs-login-or-guest--active', this.isVisible());
            this.isVisible.subscribe(function(isVisible) {
                $checkout.toggleClass('cs-login-or-guest--active', isVisible);
            });

            document.body.scrollTop = document.documentElement.scrollTop = 0;

            // Move user directly to shipping step if they are logged in.
            this.navigateIfLoggedIn();

            return this;
        },

        navigate: function() {
            if (!customer.isLoggedIn()) {
                this.isVisible(true);
            }

            this.navigateIfLoggedIn();
        },

        /**
         * Moves user directly to shipping step if they are logged in and to payment if quote has virtual items only.
         */
        navigateIfLoggedIn: function() {
            var isLoggedInObservable = customer.isLoggedIn;
            if (isLoggedInObservable()) {
                if (!quote.isVirtual()) {
                    return this.navigateToShipping();
                } else {
                    return this.navigateToPayment();
                }
            }

            var isLoggedInSubscription = isLoggedInObservable.subscribe(
                function(isLoggedIn) {
                    if (isLoggedIn) {
                        this.navigateToShipping();
                        isLoggedInSubscription.dispose();
                    }
                },
                this
            );
        },

        navigateToShipping: function() {
            var activeStep = window.location.hash.replace('#', '');
            if (!activeStep || activeStep === 'login-or-guest') {
                stepNavigator.setHash('shipping');
                stepNavigator.navigateTo('shipping');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        },

        navigateToPayment: function() {
            var activeStep = window.location.hash.replace('#', '');
            //additonal check if payment step is already active - needed for checkout reload
            if (!activeStep || activeStep === 'login-or-guest' || activeStep === 'payment') {
                stepNavigator.setHash('payment');
                stepNavigator.navigateTo('payment');
                document.body.scrollTop = document.documentElement.scrollTop = 0;

                if (quote.isVirtual()) {
                    window.checkoutConfig.selectedShippingMethod = '';
                }
            }
        },
    });
});

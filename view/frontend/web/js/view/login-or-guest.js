define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator',
    'jquery',
    'Magento_Customer/js/model/customer',
], function(ko, Component, _, stepNavigator, $, customer) {
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
         * Moves user directly to shipping step if they are logged in.
         */
        navigateIfLoggedIn: function() {
            var isLoggedInObservable = customer.isLoggedIn;
            if (isLoggedInObservable()) {
                return this.navigateToShipping();
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
    });
});

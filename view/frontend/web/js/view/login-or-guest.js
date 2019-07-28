define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator',
    'jquery',
    'Magento_Customer/js/model/customer',
], function (ko, Component, _, stepNavigator, $, customer) {
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
        initialize: function () {
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
            this.isVisible.subscribe(function (isVisible) {
                $checkout.toggleClass('cs-login-or-guest--active', isVisible);
            });
            // Move user directly to shipping step if they are logged in.
            this.navigateIfLoggedIn();

            return this;
        },

        navigate: function () { },

        /**
         * Moves user directly to shipping step if they are logged in.
         */
        navigateIfLoggedIn: function () {
            var isLoggedInObservable = customer.isLoggedIn;
            if (isLoggedInObservable()) {
                return this.navigateToShipping();
            }

            var isLoggedInSubscription = isLoggedInObservable.subscribe(
                function (isLoggedIn) {
                    if (isLoggedIn) {
                        this.navigateToShipping();
                        isLoggedInSubscription.dispose();
                    }
                },
                this
            );
        },

        /**
         * Waits for all checkout steps to load and navigates user to shipping.
         */
        navigateToShipping: function () {
            var stepsObservable = stepNavigator.steps;
            var activeStep;
            var nextStep;
            // Make sure that shipping step is already initialized before navigating to it.
            if (stepsObservable().length > 2) {
                // Set shipping step as not visible, otherwise shipping will be visible and next step will be payment
                _.findWhere(steps, {code: 'shipping'}).isVisible(false);

                stepNavigator.next();
            } else {
                var subscription = stepsObservable.subscribe(function (steps) {
                    activeStep =
                        steps[stepNavigator.getActiveItemIndex()] || {};
                    nextStep = steps[1] || {};
                    if (
                        activeStep.code === 'login-or-guest' &&
                        nextStep.code === 'shipping'
                    ) {
                        // Set shipping step as not visible, otherwise shipping will be visible and next step will be payment
                        _.findWhere(steps, {code: 'shipping'}).isVisible(false);

                        stepNavigator.next();
                        subscription.dispose();
                    }
                });
            }
        },
    });
});

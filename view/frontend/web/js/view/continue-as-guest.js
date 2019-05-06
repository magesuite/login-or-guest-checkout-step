define([
    'jquery',
    'underscore',
    'ko',
    'uiComponent',
    'Magento_Checkout/js/model/step-navigator',
], function($, _, ko, Component, stepNavigator) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'MageSuite_LoginOrGuestCheckoutStep/continue-as-guest',
        },

        /** @inheritdoc */
        initialize: function() {
            this._super();
        },

        /**
         * @returns void
         */
        navigateToNextStep: function() {
            stepNavigator.next();
        },
    });
});

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
            customerEmail: false,
            storePickupEmail: false,
        },

        /** @inheritdoc */
        initialize: function() {
            this._super();

            registry.async(`${this.name}.customer-email`)(element => {
                this.customerEmail = element;
                this.customerEmail.email.subscribe(this._onEmailUpdated.bind(this));
            });
            registry.async('checkout.steps.store-pickup.store-selector.customer-email')(
                element => this.storePickupEmail = element
            );
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

        _onEmailUpdated: function(value) {
            if (this.storePickupEmail?.email) {
                this.storePickupEmail.email(value);
            }
        }
    });
});

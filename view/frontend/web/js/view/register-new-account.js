define([
    'ko',
    'uiComponent',
    'mage/url',
    'jquery'
], function(ko, Component, url, $) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'MageSuite_LoginOrGuestCheckoutStep/register-new-account',
            registerUrl: url.build('checkout/customer_account/create'),
        },
        initialize: function(){
            this._super();
        },
        /**
         * If there is a content in static block with id login-page-create-account this content is copied and displayed and register section description
         * If the is no such text registerText value is taken. It can be configured in xml
        */
        getRegisterText: function() {
            var registerTextHtml = $('#register-text-container').html();
            return registerTextHtml ? registerTextHtml : this.registerText;
        }

    });
});

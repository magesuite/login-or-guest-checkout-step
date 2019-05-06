var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/view/shipping': {
                'MageSuite_LoginOrGuestCheckoutStep/js/view/shipping-payment-mixin': true,
            },
            'Magento_Checkout/js/view/payment': {
                'MageSuite_LoginOrGuestCheckoutStep/js/view/shipping-payment-mixin': true,
            },
            'Magento_Checkout/js/model/step-navigator': {
                'MageSuite_LoginOrGuestCheckoutStep/js/view/step-navigator-mixin': true,
            },
        },
    },
};

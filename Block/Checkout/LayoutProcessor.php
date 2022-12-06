<?php

namespace MageSuite\LoginOrGuestCheckoutStep\Block\Checkout;

class LayoutProcessor implements \Magento\Checkout\Block\Checkout\LayoutProcessorInterface
{
    protected \Magento\ReCaptchaUi\Model\UiConfigResolverInterface $uiConfigResolver;
    protected \Magento\ReCaptchaUi\Model\IsCaptchaEnabledInterface $isCaptchaEnabled;

    public function __construct(
        \Magento\ReCaptchaUi\Model\UiConfigResolverInterface $uiConfigResolver,
        \Magento\ReCaptchaUi\Model\IsCaptchaEnabledInterface $isCaptchaEnabled
    ) {
        $this->uiConfigResolver = $uiConfigResolver;
        $this->isCaptchaEnabled = $isCaptchaEnabled;
    }

    public function process($jsLayout)
    {
        $key = 'customer_login';

        if ($this->isCaptchaEnabled->isCaptchaEnabledFor($key)) {
            $jsLayout['components']['checkout']
            ['children']['steps']
            ['children']['login-or-guest']
            ['children']['authentication']
            ['children']['recaptcha'] = [
                'component' => 'Magento_ReCaptchaFrontendUi/js/reCaptcha',
                'displayArea' => 'additional-login-form-fields',
                'configSource' => 'checkoutConfig',
                'reCaptchaId' => 'recaptcha-checkout-login',
                'settings' => $this->uiConfigResolver->get($key)
            ];
        }

        return $jsLayout;
    }
}

<?php

namespace MageSuite\LoginOrGuestCheckoutStep\Block\Checkout;

class LayoutProcessor implements \Magento\Checkout\Block\Checkout\LayoutProcessorInterface
{
    protected \Magento\ReCaptchaUi\Model\UiConfigResolverInterface $uiConfigResolver;
    protected \Magento\ReCaptchaUi\Model\IsCaptchaEnabledInterface $isCaptchaEnabled;
    protected \Magento\Captcha\Helper\Data $captchaHelper;

    public function __construct(
        \Magento\ReCaptchaUi\Model\UiConfigResolverInterface $uiConfigResolver,
        \Magento\ReCaptchaUi\Model\IsCaptchaEnabledInterface $isCaptchaEnabled,
        \Magento\Captcha\Helper\Data $captchaHelper
    ) {
        $this->uiConfigResolver = $uiConfigResolver;
        $this->isCaptchaEnabled = $isCaptchaEnabled;
        $this->captchaHelper = $captchaHelper;
    }

    public function process($jsLayout)
    {
        $this->addReCaptcha($jsLayout);
        $this->addLegacyCaptcha($jsLayout);

        return $jsLayout;
    }

    protected function addReCaptcha(array &$jsLayout): void
    {
        $key = 'customer_login';

        if (!$this->isCaptchaEnabled->isCaptchaEnabledFor($key)) {
            return;
        }

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

    protected function addLegacyCaptcha(array &$jsLayout): void
    {
        if (!$this->captchaHelper->getConfig('enable')) {
            return;
        }

        $jsLayout['components']['checkout']
        ['children']['steps']
        ['children']['login-or-guest']
        ['children']['authentication']
        ['children']['captcha'] = [
            'component' => 'Magento_Captcha/js/view/checkout/loginCaptcha',
            'displayArea' => 'additional-login-form-fields',
            'formId' => 'user_login',
            'configSource' => 'checkoutConfig'
        ];
    }
}

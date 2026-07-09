<?php

declare(strict_types=1);

namespace MageSuite\LoginOrGuestCheckoutStep\Plugin\Customer\Controller\Ajax;

class NormalizeCaptchaFormId
{
    const LOGIN_FORM_ID = 'user_login';
    const CAPTCHA_FORM_ID_FIELD = 'captcha_form_id';

    public function __construct(
        protected \Magento\Framework\Serialize\Serializer\Json $serializer
    ) {}

    public function aroundExecute(
        \Magento\Customer\Controller\Ajax\Login $subject,
        \Closure $proceed
    ): \Magento\Framework\Controller\ResultInterface {
        $this->forceLoginFormId($subject->getRequest());

        return $proceed();
    }

    protected function forceLoginFormId(\Magento\Framework\App\RequestInterface $request): void
    {
        if (!$request instanceof \Magento\Framework\App\Request\Http) {
            return;
        }

        $content = $request->getContent();

        if (!$content) {
            return;
        }

        try {
            $loginParams = $this->serializer->unserialize($content);
        } catch (\InvalidArgumentException $exception) {
            return;
        }

        if (!is_array($loginParams)) {
            return;
        }

        $loginParams[self::CAPTCHA_FORM_ID_FIELD] = self::LOGIN_FORM_ID;
        $request->setContent($this->serializer->serialize($loginParams));
    }
}

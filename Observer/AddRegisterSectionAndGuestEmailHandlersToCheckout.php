<?php

namespace MageSuite\LoginOrGuestCheckoutStep\Observer;

class AddRegisterSectionAndGuestEmailHandlersToCheckout implements \Magento\Framework\Event\ObserverInterface
{
    const REGISTER_SECTION_LAYOUT_HANDLER = 'register_section';
    const GUEST_EMAIL_LAYOUT_HANDLER = 'guest_email';

    const CHECKOUT_INDEX_ACTION_NAME = 'checkout_index_index';

    /**
     * @var \Magento\Framework\App\RequestInterface
     */
    protected $request;

    /**
     * @var \Magento\Framework\Registry
     */
    protected $registry;

    /**
     * @var \MageSuite\LoginOrGuestCheckoutStep\Helper\Configuration
     */
    protected $configuration;

    public function __construct(
        \Magento\Framework\App\RequestInterface $request,
        \Magento\Framework\Registry $registry,
        \MageSuite\LoginOrGuestCheckoutStep\Helper\Configuration $configuration
    ) {
        $this->request = $request;
        $this->registry = $registry;
        $this->configuration = $configuration;
    }

    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $currentAction = $this->request->getFullActionName();

        if ($currentAction != self::CHECKOUT_INDEX_ACTION_NAME || !$this->configuration->showRegisterSection()) {
            return;
        }

        if ($this->configuration->showRegisterSection()) {
            $observer->getEvent()->getLayout()->getUpdate()->addHandle(self::REGISTER_SECTION_LAYOUT_HANDLER);
        }

        if ($this->configuration->showEmailFieldForGuest()) {
            $observer->getEvent()->getLayout()->getUpdate()->addHandle(self::GUEST_EMAIL_LAYOUT_HANDLER);
        }
    }
}

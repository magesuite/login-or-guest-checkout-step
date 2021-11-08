<?php

namespace MageSuite\LoginOrGuestCheckoutStep\Test\Integration\Controller\Customer\Account;

/**
 * @magentoDbIsolation enabled
 * @magentoAppIsolation enabled
 */
class CreateTest extends \Magento\TestFramework\TestCase\AbstractController
{
    /**
     * @var \Magento\Customer\Model\Session
     */
    protected $customerSession;

    /**
     * @var \Magento\Framework\App\RequestInterface
     */
    protected $request;

    public function setUp(): void
    {
        parent::setUp();

        $objectManager = \Magento\TestFramework\Helper\Bootstrap::getObjectManager();

        $this->customerSession = $objectManager->get(\Magento\Customer\Model\Session::class);
        $this->request = $objectManager->get(\Magento\Framework\App\RequestInterface::class);
    }

    /**
     * @magentoDbIsolation enabled
     * @magentoAppIsolation enabled
     */
    public function testItRedirectsToRegisterPage()
    {
        $this->assertEmpty($this->customerSession->getBeforeAuthUrl());

        $this->dispatch('checkout/customer_account/create');

        $this->assertRedirect($this->stringContains('customer/account/create/'));
        $this->assertStringContainsString('checkout/index/index', $this->customerSession->getBeforeAuthUrl());
    }
}

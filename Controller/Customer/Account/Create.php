<?php

namespace MageSuite\LoginOrGuestCheckoutStep\Controller\Customer\Account;

class Create extends \Magento\Framework\App\Action\Action implements \Magento\Framework\App\Action\HttpGetActionInterface
{
    /**
     * @var \Magento\Customer\Model\Session
     */
    protected $customerSession;

    /**
     * @var \Magento\Framework\UrlInterface
     */
    protected $url;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Customer\Model\Session $customerSession,
        \Magento\Framework\UrlInterface $url
    ) {
        parent::__construct($context);

        $this->customerSession = $customerSession;
        $this->url = $url;
    }

    public function execute()
    {
        $this->customerSession->setBeforeAuthUrl($this->url->getUrl('checkout/index/index'));

        $result = $this->resultFactory->create(\Magento\Framework\Controller\ResultFactory::TYPE_REDIRECT);
        $result->setUrl($this->url->getUrl('customer/account/create'));

        return $result;
    }
}

<?php
namespace MageSuite\LoginOrGuestCheckoutStep\Helper;

class Configuration
{
    const XML_PATH_SHOW_REGISTER_SECTION = 'checkout/first_step/show_register_section';
    const XML_PATH_SHOW_EMAIL_FIELD_FOR_GUEST = 'checkout/first_step/show_email_field_for_guest';

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    public function __construct(\Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    public function showRegisterSection()
    {
        return $this->scopeConfig->isSetFlag(self::XML_PATH_SHOW_REGISTER_SECTION);
    }

    public function showEmailFieldForGuest()
    {
        return $this->scopeConfig->getValue(self::XML_PATH_SHOW_EMAIL_FIELD_FOR_GUEST);
    }
}

<?php
namespace Pokupo\JsGeneratorBundle\Service;


class DefaultSettings {
    public static function GetAuthentication(){
        return array(
            'https' => "login",
            'containerId' => 'authenticationWidgetId'
        );
    }

    public static function GetSearch(){
        return array(
            'showCatalog' => 'true',
            'containerId' => 'searchWidgetId'
        );
    }

    public static function GetAdvancedSearch(){
        return array(
            'form' => array(
                'showCatalog' => 'true',
                'containerId' => 'advancedSearchFormWidgetId'
            ),
            'result' => array(
                'showCart' => 'true',
                'containerId' => 'advancedSearchResultWidgetId',
                'listPerPage' => '10, 20, 50',
                'defaultPerPage' => '20'
            )
        );
    }

    public static function GetBreadcrumbs(){
        return array(
            'containerId' => 'breadCrumbsWidgetId_1'
        );
    }

    public static function GetCartGoodsCabinet(){
        return array(
            'containerId' => 'cartGoodsCabinetWidgetId'
        );
    }

    public static function GetCartGoods(){
        return array(
            'containerId' => 'cartGoodsWidgetId'
        );
    }

    public static function GetCart(){
        return array(
            'containerId' => 'cartGoodsWidgetId',
            'showTitle' => 'never',
            'show' => array(
                'count' => 'true',
                'baseCost' => 'false',
                'finalCost' => 'false',
                'fullInfo' => 'false'
            )
        );
    }

    public static function GetShopInfo(){
        return array(
            'containerId' => 'shopInfoWidgetId',
            'show' => array (
                'logo' => 'true',
                'title' => 'true'
            )
        );
    }

    public static function GetCatalog(){
        return array(
            'containerId' => 'catalogWidgetId'
        );
    }

    public static function GetContent(){
        return array(
            'showCart' => 'true',
            'block' => array(
                'containerId' => array(
                    'slider' => 'sliderBlockId',
                    'carousel' => 'carouselBlockId',
                    'tile' => 'tileBlockId',
                    'empty' => 'emptyBlockId'
                ),
                'count' => '6'
            ),
            'content' => array(
                'containerId' => 'contentContentWidgetId',
                'listPerPage' => '10, 20, 50',
                'defaultPerPage' => '20'
            )
        );
    }

    public static function GetFavorites(){
        return array(
            'containerId' => 'favoritesWidgetId',
            'show' => array(
                'infoShop' => 'false',
                'addToCart' => 'false',
                'buy' => 'false'
            )
        );
    }

    public static function GetGoods(){
        return array(
            'containerId' => 'goodsWidgetId',
            'show' => array(
                'selectionCount' => 'false',
                'addToCart' => 'false',
                'buy' => 'false',
                'gallery' => 'false',
                'shipping' => 'false',
                'opinion' => 'false'
            )
        );
    }

    public static function GetMenuPersonalCabinet(){
        return array(
            'showCart' => 'true',
            'showRegSeller' => 'true',
            'containerId' => 'menuPersonalCabinetWidgetId'
        );
    }

    public static function GetMessage(){
        return array(
            'containerId' => 'messageWidgetId'
        );
    }

    public static function GetOrder(){
        return array(
            'containerId' => 'orderWidgetId'
        );
    }

    public static function GetOrderList(){
        return array(
            'containerId' => 'orderListWidgetId',
            'show' => array(
                'menu' => 'true'
            )
        );
    }

    public static function GetButtonPayment(){
        return array(
            'containerId' => 'paymentWidgetId',
            'button' => 'Оплатить'
        );
    }

    public static function GetProfile(){
        return array(
            'containerId' => 'profileWidgetId'
        );
    }

    public static function GetRegistration(){
        return array(
            'containerId' => 'registrationWidgetId'
        );
    }

    public static function GetRegistrationSeller(){
        return array(
            'containerId' => 'registrationSellerWidgetId'
        );
    }

    public static function GetUserInfo(){
        return array(
            'containerId' => 'userInformationWidgetId',
            'show' => array(
                'profile' => 'false',
                'icon' => 'false',
                'rating' => 'false'
            )
        );
    }
}
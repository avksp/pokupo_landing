<?php
namespace Pokupo\JsGeneratorBundle\Service;

use Pokupo\JsGeneratorBundle\Entity\Theme;

class ThemeList {
    public static function getList(){
        $list = array();
        $list[] = new Theme(
            1,
            'default',
            'test1',
            '/bundles/pokupojsgenerator/img/demo/1.png',
            'Светлая тема',
            array(
                'payment' => array('containerId' => 'content'),
                'content' =>array(
                    'block' => array('containerId' => array('empty' => 'tileBlockId')),
                    'content' => array('containerId' => 'content')
                ),
                'cartGoods' => array('containerId' => 'content'),
                'cartGoodsCabinet' => array('containerId' => 'content'),
                'favorites' => array('containerId' => 'content'),
                'goods' => array('containerId' => 'content'),
                'message' => array('containerId' => 'content'),
                'order' => array('containerId' => 'content'),
                'orderList' => array('containerId' => 'content'),
                'profile' => array('containerId' => 'content'),
                'registration' => array('containerId' => 'content'),
                'registrationSeller' => array('containerId' => 'content'),
                'advancedSearch' => array(
                    'result' => array('containerId' => 'content')
                )
            )
        );
        $list[] = new Theme(
            2,
            'test1',
            'test1',
            '/bundles/pokupojsgenerator/img/demo/2.png',
            'Темная тема',
            array()
        );
        $list[] = new Theme(
            3,
            'test2',
            'test1',
            '/bundles/pokupojsgenerator/img/demo/3.png',
            'Веселая тема',
            array()
        );

        return $list;
    }

    public static function getById($id){
        $list = self::getList();
        foreach($list as $one){
            if($one->getId() == $id)
                return $one;
        }
        return false;
    }
}
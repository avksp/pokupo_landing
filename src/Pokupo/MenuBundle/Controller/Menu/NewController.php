<?php

namespace Pokupo\MenuBundle\Controller\Menu;

use Admingenerated\PokupoMenuBundle\BaseMenuController\NewController as BaseNewController;
use Pokupo\MenuBundle\Entity\MenuItem;

/**
 * NewController
 */
class NewController extends BaseNewController
{
    /**
     * This method is here to make your life better, so overwrite  it
     *
     * @param \Symfony\Component\Form\Form $form the valid form
     * @param \Pokupo\MenuBundle\Entity\Menu $Menu your \Pokupo\MenuBundle\Entity\Menu object
     */
    public function preSave(\Symfony\Component\Form\Form $form, \Pokupo\MenuBundle\Entity\Menu $Menu) {
        $em = $this->getDoctrine()->getManager();
        $itemRoot = new MenuItem();
        $itemRoot->setAlias($Menu->getAlias());
        $itemRoot->setTitle($Menu->getName());
        $itemRoot->setLink('#');
        $itemRoot->setMenu($Menu);
        $itemRoot->setIsVisible(false);
        $itemRoot->setParentId(0);

        $em->persist($itemRoot);
    }

}

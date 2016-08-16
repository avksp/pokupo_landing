<?php

namespace Pokupo\MenuBundle\Controller\Menu_item;

use Admingenerated\PokupoMenuBundle\BaseMenu_itemController\ActionsController as BaseActionsController;

/**
 * ActionsController
 */
class ActionsController extends BaseActionsController
{
    protected function executeObjectDelete(\Pokupo\MenuBundle\Entity\MenuItem $MenuItem)
    {
        $em = $this->getDoctrine()->getManagerForClass('Pokupo\MenuBundle\Entity\MenuItem');
        $repo = $em->getRepository('Pokupo\MenuBundle\Entity\MenuItem');
        $repo->remove($MenuItem);
        if($repo->verify() === true)
            $repo->recover();
        $em->flush();
        $em->clear();
    }
}

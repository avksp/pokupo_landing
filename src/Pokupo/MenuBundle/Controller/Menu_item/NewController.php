<?php

namespace Pokupo\MenuBundle\Controller\Menu_item;

use Admingenerated\PokupoMenuBundle\BaseMenu_itemController\NewController as BaseNewController;

/**
 * NewController
 */
class NewController extends BaseNewController
{
    public function indexAction() {
        $menuId = $this->get('session')->get('MenuId');
        if (!$menuId)
            return new RedirectResponse($this->generateUrl("Pokupo_MenuBundle_Menu_list"));

        $MenuItem = $this->getNewObject();

        $form = $this->createForm($this->getNewType(), $MenuItem, $this->getFormOptions($MenuItem));

        return $this->render('PokupoMenuBundle:Menu_itemNew:index.html.twig', $this->getAdditionalRenderParameters($MenuItem) + array(
            "MenuItem" => $MenuItem,
            "form" => $form->createView(),
        ));
    }

    protected function saveObject(\Pokupo\MenuBundle\Entity\MenuItem $MenuItem) {
        $em = $this->getDoctrine()->getManagerForClass('Pokupo\MenuBundle\Entity\MenuItem');
        
        $menu = $this->getDoctrine()->getManager()->getRepository('PokupoMenuBundle:Menu')->find($this->get('session')->get('MenuId'));
                
        $MenuItem->setMenu($menu);
        $em->persist($MenuItem);
        $em->flush();
    }
}

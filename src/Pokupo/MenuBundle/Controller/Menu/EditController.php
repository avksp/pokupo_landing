<?php

namespace Pokupo\MenuBundle\Controller\Menu;

use Admingenerated\PokupoMenuBundle\BaseMenuController\EditController as BaseEditController;

/**
 * EditController
 */
class EditController extends BaseEditController
{
    protected $old_name;
    protected $old_alias;


    /**
     * This method is here to make your life better, so overwrite  it
     *
     * @param \Symfony\Component\Form\Form $form the valid form
     * @param \Pokupo\MenuBundle\Entity\Menu $Menu your \Pokupo\MenuBundle\Entity\Menu object
     */
    public function preSave(\Symfony\Component\Form\Form $form, \Pokupo\MenuBundle\Entity\Menu $Menu) {
        //var_dump(strcmp($this->old_name, $Menu->getName())); exit;
        if(strcmp($this->old_name, $Menu->getName()) != 0 || strcmp($this->old_alias, $Menu->getAlias()) != 0){
             $em = $this->getDoctrine()->getManagerForClass('Pokupo\MenuBundle\Entity\MenuItem');
            
            $menuItem = $em->getRepository('PokupoMenuBundle:MenuItem')->findOneBy(array('menu_id' => $Menu->getId(), 'level' => 0));
            $menuItem->setTitle($Menu->getName());
            $menuItem->setAlias($Menu->getAlias());
            $em->persist($menuItem);
            $em->flush();
        }
    }
    
     /**
     * Get object Pokupo\MenuBundle\Entity\Menu with identifier $pk
     *
     * @param mixed $pk
     * @return Pokupo\MenuBundle\Entity\Menu
     */
    protected function getObject($pk)
    {
        $menu = $this->getQuery($pk)->getOneOrNullResult();
        $this->old_name = $menu->getName();
        $this->old_alias = $menu->getAlias();
        return $menu;
    }
}

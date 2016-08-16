<?php

namespace Pokupo\MenuBundle\Controller\Menu;

use Admingenerated\PokupoMenuBundle\BaseMenuController\ListController as BaseListController;

/**
 * ListController
 */
class ListController extends BaseListController
{
    public function setMenuIdAction($menu_id) {
        $this->get('session')->set('MenuId', $menu_id);
        return $this->redirect($this->generateUrl("Pokupo_MenuBundle_Menu_item_list"));
    }

    public function filtersAction() {
        if ($this->get('request')->get('reset')) {
            $this->setFilters(array());
            $this->get('session')->set('Pokupo\MenuBundle\MenuList\Sort', null);
            $this->get('session')->set('Pokupo\MenuBundle\MenuList\OrderBy', null);

            return new RedirectResponse($this->generateUrl("Pokupo_MenuBundle_Menu_list"));
        }

        if ($this->getRequest()->getMethod() == "POST") {
            $form = $this->getFilterForm();
            $form->bind($this->get('request'));

            if ($form->isValid()) {
                $filters = $form->getViewData();
            }
        }

        if ($this->getRequest()->getMethod() == "GET") {
            $filters = $this->getRequest()->query->all();
        }

        if (isset($filters)) {
            $this->setFilters($filters);
        }

        return new RedirectResponse($this->generateUrl("Pokupo_MenuBundle_Menu_list"));
    }
}

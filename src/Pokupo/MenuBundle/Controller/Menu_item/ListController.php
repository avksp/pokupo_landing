<?php

namespace Pokupo\MenuBundle\Controller\Menu_item;

use Admingenerated\PokupoMenuBundle\BaseMenu_itemController\ListController as BaseListController;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * ListController
 */
class ListController extends BaseListController
{
    public function indexAction() {
        $menuId = $this->get('session')->get('MenuId');
        if (!$menuId)
            return new RedirectResponse($this->generateUrl("Pokupo_MenuBundle_Menu_list"));

        $this->parseRequestForPager();

        $form = $this->getFilterForm();

        return $this->render('PokupoMenuBundle:Menu_itemList:index.html.twig', $this->getAdditionalRenderParameters() + array(
                    'MenuItems' => $this->getPager(),
                    'form' => $form->createView(),
                    'sortColumn' => $this->getSortColumn(),
                    'sortOrder' => $this->getSortOrder(),
                    'scopes' => $this->getScopes(),
        ));
    }

    protected function buildQuery() {
        $menuId = $this->get('session')->get('MenuId');

        return $this->getDoctrine()
                        ->getManagerForClass('Pokupo\MenuBundle\Entity\MenuItem')
                        ->getRepository('Pokupo\MenuBundle\Entity\MenuItem')
                        ->createQueryBuilder('q')
                        ->andWhere('q.is_visible = true')
                        ->andWhere('q.menu_id = :menu')
                        ->setParameter('menu', $menuId)
                        ->addOrderBy('q.lft')
        ;
    }

    public function moveUpAction($id) {
        $repo = $this->getDoctrine()->getRepository('PokupoMenuBundle:MenuItem');
        $item = $repo->find($id);
        $t = $repo->moveUp($item, 1);
        if ($repo->verify() === true)
            $repo->recover();
        if ($t)
            $this->get('session')->getFlashBag()->add('success', 'Элемент успешно перемещен');
        else
            $this->get('session')->getFlashBag()->add('error', 'Не возможно переместить элемент');
        return $this->redirect($this->generateUrl("Pokupo_MenuBundle_Menu_item_list"));
    }

    public function moveDownAction($id) {
        $repo = $this->getDoctrine()->getRepository('PokupoMenuBundle:MenuItem');
        $item = $repo->find($id);
        $t = $repo->moveDown($item, 1);
        if ($repo->verify() === true)
            $repo->recover();
        if ($t)
            $this->get('session')->getFlashBag()->add('success', 'Элемент успешно перемещен');
        else
            $this->get('session')->getFlashBag()->add('error', 'Не возможно переместить элемент');

        return $this->redirect($this->generateUrl("Pokupo_MenuBundle_Menu_item_list"));
    }

    public function filtersAction() {
        if ($this->get('request')->get('reset')) {
            $this->setFilters(array());
            $this->get('session')->set('Pokupo\MenuBundle\Menu_itemList\Sort', null);
            $this->get('session')->set('Pokupo\MenuBundle\Menu_itemList\OrderBy', null);

            return new RedirectResponse($this->generateUrl("Pokupo_MenuBundle_Menu_item_list"));
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

        return new RedirectResponse($this->generateUrl("Pokupo_MenuBundle_Menu_item_list"));
    }
}

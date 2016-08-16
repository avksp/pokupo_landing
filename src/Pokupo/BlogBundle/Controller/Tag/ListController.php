<?php

namespace Pokupo\BlogBundle\Controller\Tag;

use Admingenerated\PokupoBlogBundle\BaseTagController\ListController as BaseListController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * ListController
 */
class ListController extends BaseListController
{
    public function getSearchTagsAction(Request $request){
        $search = $request->query->get('term');
        $result = array();

        if($search) {
            $tags = $this->getDoctrine()
                ->getManagerForClass('Pokupo\BlogBundle\Entity\Tag')
                ->getRepository('Pokupo\BlogBundle\Entity\Tag')
                ->getTagsLike($search);
            if($tags){
                foreach($tags as $one){
                    $result[$one->getId()] = $one->getName();
                }
            }
        }

        return new JsonResponse($result);
    }
}

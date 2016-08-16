<?php

namespace Pokupo\BlogBundle\Controller\Post;

use Admingenerated\PokupoBlogBundle\BasePostController\EditController as BaseEditController;
use Pokupo\BlogBundle\Entity\Tag;

/**
 * EditController
 */
class EditController extends BaseEditController
{
    public function preSave(\Symfony\Component\Form\Form $form, \Pokupo\BlogBundle\Entity\Post $Post){
        $Post->removeTags();

        $tags = $Post->getTagsString();
        if($tags){
            $tags = explode(',', $tags);
            foreach($tags as $one){
                if($tag = $this->checkExsistTag($one)){
                    $Post->addTag($tag);
                }
                else{
                    $tag = $this->addTagToBase($one);
                    $Post->addTag($tag);
                }
            }
        }
    }

    private function checkExsistTag($tag){
        $result = $this->getDoctrine()
            ->getManagerForClass('Pokupo\BlogBundle\Entity\Tag')
            ->getRepository('Pokupo\BlogBundle\Entity\Tag')
            ->findOneBy(array('name' => $tag));

        return $result;
    }

    private function addTagToBase($tag){
        $result = new Tag();
        $result->setName($tag);

        return $result;
    }
}

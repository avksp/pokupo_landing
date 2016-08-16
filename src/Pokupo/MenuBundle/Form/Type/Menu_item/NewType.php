<?php

namespace Pokupo\MenuBundle\Form\Type\Menu_item;

use Admingenerated\PokupoMenuBundle\Form\BaseMenu_itemType\NewType as BaseNewType;
use Symfony\Component\Form\FormBuilderInterface;
use Pokupo\MenuBundle\Entity\Repository\MenuItemRepository;

/**
 * NewType
 */
class NewType extends BaseNewType
{
    /**
     * (non-PHPdoc)
     * @see \Symfony\Component\Form\AbstractType::buildForm()
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        parent::buildForm($builder, $options);

        $builder->add('parent', 'entity', array(
            'required' => true,
            'em' => 'default',
            'translation_domain' => 'Admin',
            'class' => 'PokupoMenuBundle:MenuItem',
            'query_builder' => function(MenuItemRepository $er){
                return $er->getListItem();
            },
        ));
    }
}

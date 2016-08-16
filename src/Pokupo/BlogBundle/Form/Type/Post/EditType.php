<?php

namespace Pokupo\BlogBundle\Form\Type\Post;

use Admingenerated\PokupoBlogBundle\Form\BasePostType\EditType as BaseEditType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use JMS\SecurityExtraBundle\Security\Authorization\Expression\Expression;

/**
 * EditType
 */
class EditType extends BaseEditType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add('status', 'choice', array(
            'choices' => array('0' => 'Disabled', '1' => 'Published'),
            'required' => true,
            'label' => 'Status',
            'translation_domain' => 'Admin',
        ));


        $builder->add('tags_string', 'text', array(
            'label' => 'Tags',
            'required' => false,
            'translation_domain' => 'Admin',
        ));

        $builder->add('intro', 'ckeditor', array(
            'label' => 'Intro'
        ));

        $builder->add('content', 'ckeditor', array(
            'label' => 'Content'
        ));

    }
}

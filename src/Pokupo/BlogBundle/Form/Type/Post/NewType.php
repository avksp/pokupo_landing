<?php

namespace Pokupo\BlogBundle\Form\Type\Post;

use Admingenerated\PokupoBlogBundle\Form\BasePostType\NewType as BaseNewType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use JMS\SecurityExtraBundle\Security\Authorization\Expression\Expression;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * NewType
 */
class NewType extends BaseNewType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add('status', 'choice', array(
            'choices'   => array('0' => 'Disabled', '1' => 'Published'),
            'required'  => true,
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

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'validation_groups' => array('Post'),
            'data_class' => 'Pokupo\BlogBundle\Entity\Post'
        ));
    }
}

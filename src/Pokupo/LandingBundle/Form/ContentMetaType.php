<?php

namespace Pokupo\LandingBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ContentMetaType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('meta_title', 'text', array(
                'label' => 'Title',
                'required' => false
            ))
            ->add('meta_keywords')
            ->add('meta_description')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Pokupo\LandingBundle\Entity\ContentMeta'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'pokupor_landingbundle_contentmeta';
    }
}


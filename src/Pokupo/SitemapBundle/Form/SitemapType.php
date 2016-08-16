<?php

namespace Pokupo\SitemapBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SitemapType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('content', 'textarea', array(
                'label' => 'Content',
                'required' => true,
                'attr' => array(
                    'rows' => 20,
                    'cols' => 40
                )
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Pokupo\SitemapBundle\Entity\Sitemap'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'pokupo_sitemapbundle_sitemap';
    }
}


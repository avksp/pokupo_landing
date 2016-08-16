<?php

namespace Pokupo\LandingBundle\Form\Type\Content;

use Admingenerated\PokupoLandingBundle\Form\BaseContentType\NewType as BaseNewType;
use Symfony\Component\Form\FormBuilderInterface;
use Pokupo\LandingBundle\Form\ContentMetaType;

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
        
        $builder->add('meta', new ContentMetaType());
    }
}

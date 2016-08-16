<?php

namespace Pokupo\LandingBundle\Form\Type\Content;

use Admingenerated\PokupoLandingBundle\Form\BaseContentType\EditType as BaseEditType;
use Symfony\Component\Form\FormBuilderInterface;
use Pokupo\LandingBundle\Form\ContentMetaType;

/**
 * EditType
 */
class EditType extends BaseEditType
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

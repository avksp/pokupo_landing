<?php

namespace Pokupo\BlogBundle\Form\Type\Comment;

use Admingenerated\PokupoBlogBundle\Form\BaseCommentType\EditType as BaseEditType;
use Pokupo\BlogBundle\Model\CommentStatus;
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
            'choices' => array(
                CommentStatus::APPROVED => 'Утвержден',
                CommentStatus::DENIED => 'Запрещен',
                CommentStatus::PENDING => 'В ожидании'
            ),
            'required' => true,
            'label' => 'Status',
            'translation_domain' => 'Admin',
        ));

    }
}

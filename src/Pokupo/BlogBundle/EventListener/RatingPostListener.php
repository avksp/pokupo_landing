<?php

/*
 * This file is part of the BlogBundle package.
 *
 * Copyright (c) daniel@desarrolla2.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Daniel González <daniel@desarrolla2.com>
 */

namespace Pokupo\BlogBundle\EventListener;

use Pokupo\BlogBundle\Entity\Post;
use Pokupo\BlogBundle\Entity\Rating;
use Pokupo\BlogBundle\Event\RatingEvent;
use Pokupo\BlogBundle\Manager\PostManager;

/**
 * RatingPostListener
 */
class RatingPostListener
{
    /**
     * @var PostManager
     */
    protected $postManager;

    /**
     * @param PostManager $postManager
     */
    public function __construct(PostManager $postManager)
    {
        $this->postManager = $postManager;
    }

    /**
     * @param RatingEvent $event
     */
    public function onRate(RatingEvent $event)
    {
        $rating = $event->getRating();
        if (!$rating->getEntityName() === 'Post') {
            return;
        }
        $post = $this->postManager->find($rating->getEntityId());
        if (!$post) {
            return;
        }

        $this->postManager->updateRating($post);
    }
}

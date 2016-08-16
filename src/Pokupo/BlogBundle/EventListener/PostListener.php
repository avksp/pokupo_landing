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

use Pokupo\BlogBundle\Event\PostEvent;
use Pokupo\BlogBundle\Manager\PostManager;

/**
 * PostListener
 */
class PostListener
{
    /**
     * @param PostManager $postManager
     */
    public function __construct(PostManager $postManager)
    {
        $this->postManager = $postManager;
    }

    /**
     * @param PostEvent $event
     */
    public function onVisited(PostEvent $event)
    {
    }
}

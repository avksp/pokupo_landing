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

namespace Pokupo\BlogBundle\Entity\Repository;

use DateTime;
use Pokupo\BlogBundle\Entity\Post;
use Pokupo\BlogBundle\Entity\PostView;
use Doctrine\ORM\EntityRepository;

/**
 * PostViewRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PostViewRepository extends EntityRepository
{
    /**
     * @param Post $post
     */
    public function add(Post $post)
    {
        $em = $this->getEntityManager();

        $date = new DateTime();

        $click = $this->findOneBy(
            array(
                'postId' => $post->getId(),
                'date' => $date,
            )
        );
        if (!$click) {
            $click = new PostView();
            $click->setPost($post);
            $click->setDate($date);
        }

        $click->increment();

        $em->persist($click);
        $em->flush();
    }
}

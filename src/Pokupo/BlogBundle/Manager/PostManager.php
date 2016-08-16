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

namespace Pokupo\BlogBundle\Manager;

use DateTime;
use Pokupo\BlogBundle\Entity\Post;
use Pokupo\BlogBundle\Entity\Repository\PostRepository;
use Pokupo\BlogBundle\Model\PostStatus;

/**
 * PostManager
 */
class PostManager extends AbstractManager
{
    /**
     * @param Post $post
     */
    public function publish(Post $post)
    {
        $post->setStatus(PostStatus::PUBLISHED);
        $post->setPublishedAt(new DateTime());
        $this->persist($post);
    }

    /**
     * @param Post $post
     */
    public function updateRating(Post $post)
    {
        $rating = $this->em->getRepository('PokupoBlogBundle:Rating')
            ->getRatingFor('Post', $post->getId());
        $votes = $this->em->getRepository('PokupoBlogBundle:Rating')
            ->getVotesFor('Post', $post->getId());
        $post->setRating($rating);
        $post->setVotes($votes);

        $this->persist($post);
    }

    /**
     * @return Post
     */
    public function create()
    {
        return new Post();
    }

    /**
     * @return PostRepository
     */
    public function getRepository()
    {
        return $this->em->getRepository('PokupoBlogBundle:Post');
    }
}

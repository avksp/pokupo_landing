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

namespace Pokupo\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * PostClick
 *
 * @ORM\Table(name="post_click",indexes={@ORM\Index(name="post_click_idx", columns={"post_id", "date"})})
 * @ORM\Entity(repositoryClass="Pokupo\BlogBundle\Entity\Repository\PostClickRepository")
 */
class PostClick
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var Post
     *
     * @ORM\Column(name="post_id", type="integer")
     */
    protected $postId;

    /**
     * @var Post
     *
     * @ORM\Column(name="post_slug", type="string")
     */
    protected $postSlug;

    /**
     * @var Post
     *
     * @ORM\Column(name="count", type="integer")
     */
    protected $count;

    /**
     * @var \DateTime $published_at
     *
     * @ORM\Column(name="date", type="date")
     */
    protected $date;

    /**
     * @var \DateTime $created_at
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $createdAt;

    /**
     * @var \DateTime $updated_at
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updatedAt;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set post_id
     *
     * @param integer $postId
     *
     * @return PostClick
     */
    public function setPostId($postId)
    {
        $this->postId = $postId;


    }

    /**
     * Get post_id
     *
     * @return integer
     */
    public function getPostId()
    {
        return $this->postId;
    }

    /**
     * Set post_slug
     *
     * @param string $postSlug
     *
     * @return PostClick
     */
    public function setPostSlug($postSlug)
    {
        $this->postSlug = $postSlug;


    }

    /**
     * Get post_slug
     *
     * @return string
     */
    public function getPostSlug()
    {
        return $this->postSlug;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return PostClick
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;


    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return PostClick
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;


    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set post
     *
     * @param \Pokupo\BlogBundle\Entity\Post $post
     *
     * @return FeedItem
     */
    public function setPost(\Pokupo\BlogBundle\Entity\Post $post = null)
    {
        $this->postId = $post->getId();
        $this->postSlug = $post->getSlug();


    }

    /**
     * Set count
     *
     * @param integer $count
     *
     * @return PostClick
     */
    public function setCount($count)
    {
        $this->count = $count;


    }

    /**
     * Get count
     *
     * @return integer
     */
    public function getCount()
    {
        return $this->count;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return PostClick
     */
    public function setDate($date)
    {
        $this->date = $date;


    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     *
     */
    public function increment()
    {
        $this->count++;
    }
}

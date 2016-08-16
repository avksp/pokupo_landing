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

use Pokupo\BlogBundle\Model\PostStatus;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Post
 *
 * @ORM\Table(name="post")
 * @ORM\Entity(repositoryClass="Pokupo\BlogBundle\Entity\Repository\PostRepository")
 */
class Post
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
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Tag", cascade={"persist"})
     * @ORM\JoinTable(name="post_tag")
     */
    protected $tags;

    protected $tags_string;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="post", cascade={"remove"})
     */
    protected $comments;

    /**
     * @var Author
     *
     * @ORM\ManyToOne(targetEntity="Author")
     */
    protected $author;

    /**
     * @var string $name
     * @Assert\NotBlank(message="Please enter name.", groups={"Post"})
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;

    /**
     * @var string $slug
     * @Assert\NotBlank(message="Please enter slug.", groups={"Post"})
     * @Gedmo\Slug(fields={"name"})
     * @ORM\Column(name="slug", type="string", length=255, unique=true))
     */
    protected $slug;

    /**
     * @var string $source
     *
     * @ORM\Column(name="source", type="string", length=255, nullable=true)
     */
    protected $source;

    /**
     * @var string $image
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     */
    protected $image;

    /**
     * @var string $intro
     * @Assert\NotBlank(message="Please enter intro.", groups={"Post"})
     * @ORM\Column(name="intro", type="text")
     */
    protected $intro;

    /**
     * @var string $content
     * @Assert\NotBlank(message="Please enter content.", groups={"Post"})
     * @ORM\Column(name="content", type="text")
     */
    protected $content;

    /**
     * @var int $status
     *
     * @ORM\Column(name="status", type="integer", options={"default" = 1})
     */
    protected $status = 1;

    /**
     * @var int $promotion
     *
     * @ORM\Column(name="promotion", type="integer")
     */
    protected $promotion = 1;

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
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(name="published_at", type="datetime")
     */
    protected $publishedAt;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->history = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getName();
    }

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
     * Set content
     *
     * @param string $content
     *
     * @return Post
     */
    public function setContent($content)
    {
        $this->content = (string)$content;


    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set slug
     *
     * @param string $slug
     *
     * @return Post
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;


    }

    /**
     * Get slug
     *
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set created_at
     *
     * @param \DateTime $createdAt
     *
     * @return Post
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;


    }

    /**
     * Get created_at
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     *
     * @return Post
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;


    }

    /**
     * Get updated_at
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set author
     *
     * @param Author $author
     *
     * @return Post
     */
    public function setAuthor(Author $author = null)
    {
        $this->author = $author;


    }

    /**
     * Get author
     *
     * @return Author
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Post
     */
    public function setName($name)
    {
        $this->name = $name;


    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add tags
     *
     * @param Tag $tags
     *
     * @return Post
     */
    public function addTag(Tag $tags)
    {
        $this->tags[] = $tags;


    }

    /**
     * Remove tags
     *
     * @param Tag $tags
     */
    public function removeTag(Tag $tags)
    {
        $this->tags->removeElement($tags);
    }

    /**
     * Clear Tags
     */
    public function removeTags()
    {
        $this->tags = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     *
     * @return string
     */
    public function getTagsAsString()
    {
        $tags = '';
        foreach ($this->tags as $tag) {
            $tags .= $tag->getName().' ';
        }

        return trim($tags);
    }

    /**
     * Add comments
     *
     * @param Comment $comments
     *
     * @return Post
     */
    public function addComment(Comment $comments)
    {
        $this->comments[] = $comments;


    }

    /**
     * Remove comments
     *
     * @param Comment $comments
     */
    public function removeComment(Comment $comments)
    {
        $this->comments->removeElement($comments);
    }

    /**
     * Get comments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * Set intro
     *
     * @param string $intro
     *
     * @return Post
     */
    public function setIntro($intro)
    {
        $this->intro = $intro;
    }

    /**
     * Get intro
     *
     * @return string
     */
    public function getIntro()
    {
        return $this->intro;
    }

    /**
     * Set publishedAt
     *
     * @param \DateTime $publishedAt
     *
     * @return Post
     */
    public function setPublishedAt($publishedAt)
    {
        $this->publishedAt = $publishedAt;


    }

    /**
     * Get publishedAt
     *
     * @return \DateTime
     */
    public function getPublishedAt()
    {
        return $this->publishedAt;
    }

    /**
     * Add history
     *
     * @param \Pokupo\BlogBundle\Entity\PostHistory $history
     *
     * @return Post
     */
    public function addHistory(\Pokupo\BlogBundle\Entity\PostHistory $history)
    {
        $this->history[] = $history;


    }

    /**
     * Remove history
     *
     * @param \Pokupo\BlogBundle\Entity\PostHistory $history
     */
    public function removeHistory(\Pokupo\BlogBundle\Entity\PostHistory $history)
    {
        $this->history->removeElement($history);
    }

    /**
     * Get history
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHistory()
    {
        return $this->history;
    }

    /**
     * Set source
     *
     * @param string $source
     *
     * @return Post
     */
    public function setSource($source)
    {
        $this->source = $source;
    }

    /**
     * Get source
     *
     * @return string
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * @return bool
     */
    public function hasSource()
    {
        return $this->getSource() ? true : false;
    }

    /**
     * Get Status
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set Status
     *
     * @param int $status
     *
     * @return Post
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * Get Image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set Image
     *
     * @param string $image
     *
     * @return Post
     */
    public function setImage($image)
    {
        $this->image = $image;


    }

    /**
     * Retrieve if is published
     *
     * @return bool
     */
    public function isPublished()
    {
        return $this->status == PostStatus::PUBLISHED ? true : false;
    }

    /**
     * Retrieve if has image
     *
     * @return bool
     */
    public function hasImage()
    {
        if (is_null($this->image)) {
            return false;
        }
        if (!strlen(trim($this->image))) {
            return false;
        }

        return true;
    }

    /**
     * @param int $promotion
     */
    public function setPromotion($promotion)
    {
        $this->promotion = $promotion;
    }

    /**
     * @return int
     */
    public function getPromotion()
    {
        return $this->promotion;
    }

    public function getTagsString(){
        if(!$this->tags_string) {
            $result = array();
            foreach ($this->getTags() as $one) {
                $result[] = $one->getName();
            }
            return implode(',', $result);
        }
        return $this->tags_string;
    }

    public function setTagsString($tags_string){
        $this->tags_string = $tags_string;
    }
}

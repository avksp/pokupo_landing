<?php
// src/Pokupo/LandingBundle/Entity/ContentMeta.php

namespace Pokupo\LandingBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Table(name="content_meta")
 * @ORM\Entity(repositoryClass="Pokupo\LandingBundle\Entity\Repository\ContentMetaRepository")
 */
class ContentMeta {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $meta_title; 
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $meta_keywords;
    
    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $meta_description;
    
    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $more_scripts;
    
    /**
     * @ORM\OneToOne(targetEntity="Content", inversedBy="meta")
     * @ORM\JoinColumn(name="content_id", referencedColumnName="id")
     */
    protected $content;

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
     * Set metaTitle
     *
     * @param string $metaTitle
     *
     * @return ContentMeta
     */
    public function setMetaTitle($metaTitle)
    {
        $this->meta_title = $metaTitle;

        return $this;
    }

    /**
     * Get metaTitle
     *
     * @return string
     */
    public function getMetaTitle()
    {
        return $this->meta_title;
    }

    /**
     * Set metaKeywords
     *
     * @param string $metaKeywords
     *
     * @return ContentMeta
     */
    public function setMetaKeywords($metaKeywords)
    {
        $this->meta_keywords = $metaKeywords;

        return $this;
    }

    /**
     * Get metaKeywords
     *
     * @return string
     */
    public function getMetaKeywords()
    {
        return $this->meta_keywords;
    }

    /**
     * Set metaDescription
     *
     * @param string $metaDescription
     *
     * @return ContentMeta
     */
    public function setMetaDescription($metaDescription)
    {
        $this->meta_description = $metaDescription;

        return $this;
    }

    /**
     * Get metaDescription
     *
     * @return string
     */
    public function getMetaDescription()
    {
        return $this->meta_description;
    }

    /**
     * Set moreScripts
     *
     * @param string $moreScripts
     *
     * @return ContentMeta
     */
    public function setMoreScripts($moreScripts)
    {
        $this->more_scripts = $moreScripts;

        return $this;
    }

    /**
     * Get moreScripts
     *
     * @return string
     */
    public function getMoreScripts()
    {
        return $this->more_scripts;
    }

    /**
     * Set content
     *
     * @param \Pokupo\LandingBundle\Entity\Content $content
     *
     * @return ContentMeta
     */
    public function setContent(\Pokupo\LandingBundle\Entity\Content $content = null)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return \Pokupo\LandingBundle\Entity\Content
     */
    public function getContent()
    {
        return $this->content;
    }
}

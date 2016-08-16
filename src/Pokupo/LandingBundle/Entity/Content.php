<?php

//src/Pokupo/LandingBundle/Entity/Content.php

namespace Pokupo\LandingBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Table(name="content")
 * @ORM\Entity(repositoryClass="Pokupo\LandingBundle\Entity\Repository\ContentRepository")
 * @UniqueEntity(fields="alias", message="Sorry, this alias is already in use.", groups={"Content"})
 * @ORM\HasLifecycleCallbacks
 */
class Content {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    protected $title;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Assert\NotBlank(message="Please enter alias.", groups={"Content"})
     * @Assert\Regex( 
     *       pattern="/^[a-z,A-Z,\_,\-,0-9]+$/",
     *       message="Alias can contain only letters, numbers and symbols '_' , '-'.", 
     *       groups={"Content"}
     * )
     */
    protected $alias;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $anons;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $content;
    
    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    protected $show_editor_content = true;
    
    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    protected $is_active = true;
    
    /**
     * @ORM\OneToOne(targetEntity="ContentMeta", 
     *   mappedBy="content", 
     *   cascade={"persist", "remove"})
    */
    protected $meta;
    
    /**
     * @ORM\ManyToOne(
     *   targetEntity="Pokupo\LayoutBundle\Entity\Layout", 
     *   inversedBy="content")
     * @ORM\JoinColumn(
     *   name="layout_id", 
     *   referencedColumnName="id", 
     *   onDelete="CASCADE")
     */
    protected $layout;

    /**
     * @var datetime $created
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(name="created_at",type="datetime")
     */
    protected $createdAt;

    /**
     * @var datetime $update
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updatedAt;

    /**
     * @var datetime $contentChanged
     *
     * @ORM\Column(name="content_changed", type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="change", field={"title", "content"})
     */
    protected $contentChanged;

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
     * Set title
     *
     * @param string $title
     *
     * @return Content
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set alias
     *
     * @param string $alias
     *
     * @return Content
     */
    public function setAlias($alias)
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * Get alias
     *
     * @return string
     */
    public function getAlias()
    {
        return $this->alias;
    }

    /**
     * Set anons
     *
     * @param string $anons
     *
     * @return Content
     */
    public function setAnons($anons)
    {
        $this->anons = $anons;

        return $this;
    }

    /**
     * Get anons
     *
     * @return string
     */
    public function getAnons()
    {
        return $this->anons;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return Content
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
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
     * Set showEditorContent
     *
     * @param boolean $showEditorContent
     *
     * @return Content
     */
    public function setShowEditorContent($showEditorContent)
    {
        $this->show_editor_content = $showEditorContent;

        return $this;
    }

    /**
     * Get showEditorContent
     *
     * @return boolean
     */
    public function getShowEditorContent()
    {
        return $this->show_editor_content;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     *
     * @return Content
     */
    public function setIsActive($isActive)
    {
        $this->is_active = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean
     */
    public function getIsActive()
    {
        return $this->is_active;
    }

    /**
     * Set meta
     *
     * @param \Pokupo\LandingBundle\Entity\ContentMeta $meta
     *
     * @return Content
     */
    public function setMeta(\Pokupo\LandingBundle\Entity\ContentMeta $meta = null)
    {
        $meta->setContent($this);
        $this->meta = $meta;

        return $this;
    }

    /**
     * Get meta
     *
     * @return \Pokupo\LandingBundle\Entity\ContentMeta
     */
    public function getMeta()
    {
        return $this->meta;
    }

    /**
     * Set layout
     *
     * @param \Pokupo\LayoutBundle\Entity\Layout $layout
     *
     * @return Content
     */
    public function setLayout(\Pokupo\LayoutBundle\Entity\Layout $layout = null)
    {
        $this->layout = $layout;

        return $this;
    }

    /**
     * Get layout
     *
     * @return \Pokupo\LayoutBundle\Entity\Layout
     */
    public function getLayout()
    {
        return $this->layout;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Content
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
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
     * @return Content
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
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
     * Set contentChanged
     *
     * @param \DateTime $contentChanged
     *
     * @return Content
     */
    public function setContentChanged($contentChanged)
    {
        $this->contentChanged = $contentChanged;

        return $this;
    }

    /**
     * Get contentChanged
     *
     * @return \DateTime
     */
    public function getContentChanged()
    {
        return $this->contentChanged;
    }
}

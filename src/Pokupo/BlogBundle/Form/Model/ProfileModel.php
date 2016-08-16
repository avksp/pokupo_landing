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

namespace Pokupo\BlogBundle\Form\Model;

use Pokupo\BlogBundle\Entity\Profile;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ProfileModel
 */
class ProfileModel
{
    /**
     * @Assert\Length( min=5, max=100 )
     */
    protected $name;

    /**
     * @Assert\Length( min=5, max=100 )
     */
    protected $address;

    /**
     * @Assert\Length( min=5, max=1000 )
     */
    protected $description;

    /**
     * @var bool
     */
    protected $showPublicProfile;

    /**
     * @param Profile $profile
     */
    public function __construct(Profile $profile)
    {
        $this->name = $profile->getName();
        $this->address = $profile->getAddress();
        $this->description = $profile->getDescription();
        $this->showPublicProfile = false;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param string $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return boolean
     */
    public function isShowPublicProfile()
    {
        return $this->showPublicProfile;
    }

    /**
     * @param boolean $showPublicProfile
     */
    public function setShowPublicProfile($showPublicProfile)
    {
        $this->showPublicProfile = $showPublicProfile;
    }
}

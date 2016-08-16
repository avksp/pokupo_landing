<?php

namespace Pokupo\JsGeneratorBundle\Entity;


class Theme {
    protected $id;
    protected $alias;
    protected $name;
    protected $thumb;
    protected $description;
    protected $customSettings;

    function __construct($id, $alias, $name, $thumb, $description, $customSettings) {
        $this->id = $id;
        $this->alias = $alias;
        $this->name = $name;
        $this->thumb = $thumb;
        $this->description = $description;
        $this->customSettings = $customSettings;
    }

    /**
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getAlias() {
        return $this->alias;
    }

    /**
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getThumb() {
        return $this->thumb;
    }

    /**
     * @return string
     */
    public function getDescription(){
        return $this->description;
    }

    /**
     * @return string
     */
    public function getCustomSettings(){
        return $this->customSettings;
    }
}
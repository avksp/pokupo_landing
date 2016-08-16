<?php

namespace Pokupo\SitemapBundle\Entity;

class Sitemap
{
    protected $dir;

    protected $content;

    public function __construct($dir)
    {
        $this->content = '';
        $this->dir = $dir;
        if(file_exists($dir .'sitemap.xml'))
            $this->content = file_get_contents($dir .'sitemap.xml');
    }

    public function getFileName(){
        return 'sitemap.xml';
    }

    public function getDir(){
        return $this->dir;
    }

    public function getContent(){
        return $this->content;
    }

    public function setContent($content){
        $this->content = $content;
        return $this;
    }
}
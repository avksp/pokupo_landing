<?php

namespace Pokupo\SitemapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('PokupoSitemapBundle:Default:index.html.twig', array('name' => $name));
    }
}

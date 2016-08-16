<?php

namespace Pokupo\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('PokupoUserBundle:Default:index.html.twig', array('name' => $name));
    }
}

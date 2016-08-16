<?php

namespace Pokupo\MenuBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('PokupoMenuBundle:Default:index.html.twig', array('name' => $name));
    }
}

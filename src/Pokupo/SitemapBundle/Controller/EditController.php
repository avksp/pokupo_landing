<?php

namespace Pokupo\SitemapBundle\Controller;

use Pokupo\SitemapBundle\Entity\Sitemap;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Pokupo\SitemapBundle\Form\SitemapType;


class EditController extends Controller
{
    public function indexAction()
    {
        $sitemap = $this->getObject();

        $form = $this->createForm(new SitemapType(), $sitemap);

        return $this->render('PokupoSitemapBundle:SitemapEdit:index.html.twig', array(
            "Sitemap" => $sitemap,
            "form" => $form->createView()
        ));
    }

    public function updateAction()
    {
        $sitemap = $this->getObject();

        $form = $this->createForm(new SitemapType(), $sitemap);
        $form->bind($this->get('request'));

        $message = '';
        try {
            $doc = new \DOMDocument;
            $doc->loadXML($sitemap->getContent());
        }
        catch(\Exception $e){
            $message = $e->getMessage();
            $message = explode(' in /var/', $message);
            $message = $message[0];
        }

        if ($form->isValid() && empty($message)) {
            try {
                $this->saveObject($sitemap);

                $this->get('session')->getFlashBag()->add('success', $this->get('translator')->trans("action.object.edit.success", array(), 'Admingenerator') );

                return new RedirectResponse($this->generateUrl("pokupo_sitemap_edit" ));

            } catch (\Exception $e) {
                $this->get('session')->getFlashBag()->add('error',  $this->get('translator')->trans("action.object.edit.error", array(), 'Admingenerator') );
                $this->onException($e, $form, $sitemap);
            }

        } else {
            $this->get('session')->getFlashBag()->add('error',  $this->get('translator')->trans("action.object.edit.error", array(), 'Admingenerator') );
            if($message)
                $this->get('session')->getFlashBag()->add('error',  $message );
        }

        return $this->render('PokupoSitemapBundle:SitemapEdit:index.html.twig', array(
            "Layout" => $sitemap,
            "form" => $form->createView(),
        ));
    }

    /**
     * This method is here to make your life better, so overwrite it
     *
     * @param \Exception $exception throwed exception
     * @param \Symfony\Component\Form\Form $form the valid form
     * @param \Pokupo\SitemapBundle\Entity\Sitemap $Sitemap your \Pokupo\SitemapBundle\Entity\Sitemap object
     */
    public function onException(\Exception $exception, \Symfony\Component\Form\Form $form, \Pokupo\SitemapBundle\Entity\Sitemap $Sitemap)
    {
        if ($this->container->getParameter('kernel.debug')) {
            throw $exception;
        }
    }


    /**
     * Get object Pokupo\SitemapBundle\Entity\Sitemap
     *
     * @param mixed $pk
     * @return Pokupo\SitemapBundle\Entity\Sitemap
     */
    protected function getObject()
    {
        $dir = $this->get('kernel')->getRootDir() . '/../web/';
        return new Sitemap($dir);
    }


    protected function saveObject(\Pokupo\SitemapBundle\Entity\Sitemap $Sitemap)
    {
        file_put_contents($Sitemap->getDir() .$Sitemap->getFileName(), $Sitemap->getContent());
    }
}

<?php

namespace Pokupo\LandingBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ContentController extends Controller
{
    public function indexAction(Request $request, $alias, $shopId = 1){
        $protocol = $this->getProtocol($request);
        
        $em = $this->getDoctrine()->getRepository('PokupoLandingBundle:Content');
        $content = $em->GetContentByAlias($alias);

        if (!$content) {
            throw $this->createNotFoundException('Unable to find Content with alias = ['.$alias.']');
        }

        $response = new Response();
//        $lastModified = $content->getCreatedAt();
//        if($content->getContentChanged())
//            $lastModified = $content->getContentChanged();
//        $response->setLastModified($lastModified);
//        $response->setPublic();

        if ($response->isNotModified($this->getRequest())) {
            return $response; // this will return the 304 if the cache is OK
        }

        if($alias == 'shop'){
            return $this->render(
                'PokupoLandingBundle:Content:shop.html.twig', array(
                    'content' => $content,
                    'shopId' => $shopId, 
                    'protocol' => $protocol), $response
            );
        }
        return $this->render(
            'PokupoLandingBundle:Content:index.html.twig', array(
                'content' => $content,
                'shopId' => $shopId,
                'protocol' => $protocol), $response
        );
    }

    public function paymentAction(Request $request, $shopId, $theme){
        $protocol = $this->getProtocol($request);

        $response = new Response();

        if ($response->isNotModified($this->getRequest())) {
            return $response; // this will return the 304 if the cache is OK
        }

        return $this->render(
            'PokupoLandingBundle:Content:payment.html.twig', array(
            'shopId' => $shopId,
            'theme' =>$theme,
            'protocol' => $protocol), $response
        );
    }

    public function searchAction(Request $request, $shopId = 1){
        $protocol = $this->getProtocol($request);

        $q = $request->query->get('q');
        if($q){
            $result = $this->get('doctrine')->getRepository('PokupoLandingBundle:Content')->getSearchContent($q);
            return $this->render(
                'PokupoLandingBundle:Content:search.html.twig', array(
                'content' => $result,
                'shopId' => $shopId,
                'theme' => 'default',
                'protocol' => $protocol,
                'q' => $q)
            );
        }

        exit;
    }

    public function notFoundAction(){
        throw new NotFoundHttpException();
    }

    private function getProtocol($request){
        $protocol = 'http';
        if($request->isSecure() || $request->getPort() == 443 || $request->server->get('HTTP_X_FORWARDED_PROTO') == 'https')
            $protocol = 'https';

        return $protocol;
    }
}
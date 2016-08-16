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

namespace Pokupo\BlogBundle\Controller;

use Pokupo\BlogBundle\Entity\PostClick;
use Pokupo\BlogBundle\Model\PostStatus;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * RedirectController
 *
 * Route("/r")
 */
class RedirectController extends Controller
{
//    /**
//     * Redirect to post source if it has
//     *
//     * @Route("/p/s/{id}", name="_blog_redirect_post_source", requirements={"id" = "\d{1,11}"})
//     * @Method({"GET"})
//     *
//     * @param Request $request
//     *
//     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
//     * @return RedirectResponse
//     */
//    public function postSourceAction(Request $request)
//    {
//        $post = $this->getDoctrine()->getManager()
//            ->getRepository('PokupoBlogBundle:Post')->find($request->get('id', false));
//
//        if (!$post) {
//            throw $this->createNotFoundException('The post does not exist');
//        }
//        if ($post->getStatus() != PostStatus::PUBLISHED) {
//            return new RedirectResponse($this->generateUrl('_blog_default'), 302);
//        }
//        if (!$post->hasSource()) {
//            return new RedirectResponse(
//                $this->generateUrl('_blog_view', array('slug' => $post->getSlug())),
//                302
//            );
//        }
//
//        $this->getDoctrine()->getManager()
//            ->getRepository('PokupoBlogBundle:PostClick')
//            ->add($post);
//
//        return new RedirectResponse(
//            $post->getSource(),
//            302
//        );
//    }
}

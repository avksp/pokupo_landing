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

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class SiteMapController
 *
 * @author Daniel González <daniel@desarrolla2.com>
 */
class SiteMapController extends Controller
{
//    /**
//     * @Route("/sitemap.xml", name="_blog_sitemap")
//     * @Method({"GET"})
//     */
//    public function indexAction(Request $request)
//    {
//        $request->setRequestFormat('xml');
//
//        return $this->render(
//            'PokupoBlogBundle:/SiteMap:index.xml.twig',
//            array()
//        );
//    }
//
//    /**
//     * @Route("/sitemap.archive.xml", name="_blog_sitemap_archive")
//     * @Method({"GET"})
//     */
//    public function archiveAction(Request $request)
//    {
//        return $this->render(
//            'PokupoBlogBundle:/SiteMap:archive.xml.twig',
//            array(
//                'items' => $this->getDoctrine()->getManager()
//                        ->getRepository('PokupoBlogBundle:Post')->getArchiveItems(),
//            )
//        );
//    }
//
//    /**
//     * @Route("/sitemap.post.xml", name="_blog_sitemap_post")
//     * @Method({"GET"})
//     */
//    public function postAction(Request $request)
//    {
//        $request->setRequestFormat('xml');
//        $items = array();
//        $posts = $this->getDoctrine()->getManager()
//            ->getRepository('PokupoBlogBundle:Post')->get(
//                $this->container->getParameter('blog.sitemap.items')
//            );
//        foreach ($posts as $post) {
//            $items[] = $this->generateUrl('_blog_view', array('slug' => $post->getSlug()), true);
//        }
//
//        return $this->render(
//            'PokupoBlogBundle:/SiteMap:post.xml.twig',
//            array(
//                'items' => $items,
//            )
//        );
//    }
//
//    /**
//     * @Route("/sitemap.search.xml", name="_blog_sitemap_search")
//     * @Method({"GET"})
//     */
//    public function searchAction(Request $request)
//    {
//        $items = array();
//
//        return $this->render(
//            'PokupoBlogBundle:/SiteMap:archive.xml.twig',
//            array(
//                'items' => $items,
//            )
//        );
//    }
//
//    /**
//     * @Route("/sitemap.tag.xml", name="_blog_sitemap_tag")
//     * @Method({"GET"})
//     */
//    public function tagAction(Request $request)
//    {
//        $request->setRequestFormat('xml');
//        $items = array();
//        $tags = $this->getDoctrine()->getManager()
//            ->getRepository('PokupoBlogBundle:Tag')->get(
//                $this->container->getParameter('blog.sitemap.items')
//            );
//        foreach ($tags as $tag) {
//            $items[] = $this->generateUrl('_blog_tag', array('slug' => $tag->getSlug()), true);
//        }
//
//        return $this->render(
//            'PokupoBlogBundle:/SiteMap:tag.xml.twig',
//            array(
//                'items' => $items,
//            )
//        );
//    }
}

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

use DateTime;
use Pokupo\BlogBundle\Model\PostStatus;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 *
 * Description of StatsController
 *
 * @Route("/report")
 */
class ReportController extends Controller
{
//    /**
//     * @Route("/posted-items", name="_blog_report")
//     * @Method({"GET"})
//     * @Template()
//     */
//    public function postedItemsAction()
//    {
//        $em = $this->getDoctrine()->getManager();
//        $day_ago = new DateTime('-1 day');
//        $week_ago = new DateTime('-1 week');
//        $month_ago = new DateTime('-1 month');
//        $year_ago = new DateTime('-1 year');
//        $first_time = new DateTime('1th January 1970 00:00:00 (UTC)');
//
//        return array(
//            'post' => array(
//                'last_day' => $em->getRepository('PokupoBlogBundle:Post')
//                    ->countFromDate($day_ago),
//                'last_week' => $em->getRepository('PokupoBlogBundle:Post')
//                    ->countFromDate($week_ago),
//                'last_month' => $em->getRepository('PokupoBlogBundle:Post')
//                    ->countFromDate($month_ago),
//                'last_year' => $em->getRepository('PokupoBlogBundle:Post')
//                    ->countFromDate($year_ago),
//                'total' => $em->getRepository('PokupoBlogBundle:Post')
//                    ->countFromDate($first_time),
//            ),
//            'comment' => array(
//                'last_day' => $em->getRepository('PokupoBlogBundle:Comment')
//                    ->countFromDate($day_ago),
//                'last_week' => $em->getRepository('PokupoBlogBundle:Comment')
//                    ->countFromDate($week_ago),
//                'last_month' => $em->getRepository('PokupoBlogBundle:Comment')
//                    ->countFromDate($month_ago),
//                'last_year' => $em->getRepository('PokupoBlogBundle:Comment')
//                    ->countFromDate($year_ago),
//                'total' => $em->getRepository('PokupoBlogBundle:Comment')
//                    ->countFromDate($first_time),
//            ),
//            'link' => array(
//                'last_day' => $em->getRepository('PokupoBlogBundle:Link')
//                    ->countFromDate($day_ago),
//                'last_week' => $em->getRepository('PokupoBlogBundle:Link')
//                    ->countFromDate($week_ago),
//                'last_month' => $em->getRepository('PokupoBlogBundle:Link')
//                    ->countFromDate($month_ago),
//                'last_year' => $em->getRepository('PokupoBlogBundle:Link')
//                    ->countFromDate($year_ago),
//                'total' => $em->getRepository('PokupoBlogBundle:Link')
//                    ->countFromDate($first_time),
//            ),
//        );
//    }
//
//    /**
//     * @Route("/most-rated/{period}",
//     * name="_blog_report_most_rated",
//     * requirements={"period" = "yesterday|last-week|last-month|last-year|ever"})
//     * @Method({"GET"})
//     */
//    public function mostRatedAction(Request $request)
//    {
//        $em = $this->getDoctrine()->getManager();
//        $from = $this->getFrom($request->get('period'));
//
//        $items = $em->createQuery(
//            ' SELECT r.entityId as id, SUM(r.rating) as rating '.
//            ' FROM BlogBundle:Rating r '.
//            ' WHERE r.entityName = \'Post\' '.
//            ' AND r.createdAt >= :from'.
//            ' GROUP BY r.entityId '.
//            ' ORDER by rating DESC '
//        )
//            ->setParameter('from', $from)
//            ->setMaxResults(12)
//            ->getResult();
//
//        foreach ($items as $key => $item) {
//            $post = $em->getRepository('PokupoBlogBundle:Post')->find($item['id']);
//            if (!$post) {
//                continue;
//            }
//            if ($post->getStatus() != PostStatus::PUBLISHED) {
//                continue;
//            }
//
//            $item['post'] = $post;
//            $items[$key] = $item;
//        }
//
//        return $this->render(
//            'PokupoBlogBundle:/Report:mostRated.html.twig',
//            array(
//                'items' => $items,
//                'period' => $this->getPeriod($request->get('period')),
//            )
//        );
//    }
//
//    /**
//     * @Route("/most-viewed/{period}",
//     * name="_blog_report_most_viewed",
//     * requirements={"period" = "yesterday|last-week|last-month|last-year|ever"})
//     * @Method({"GET"})
//     */
//    public function mostViewedAction(Request $request)
//    {
//        $em = $this->getDoctrine()->getManager();
//        $from = $this->getFrom($request->get('period'));
//
//        $items = $em->createQuery(
//            ' SELECT r.entityId as id, SUM(r.rating) as rating '.
//            ' FROM PokupoBlogBundle:Rating r '.
//            ' WHERE r.entityName = \'Post\' '.
//            ' AND r.createdAt >= :from'.
//            ' GROUP BY r.entityId '.
//            ' ORDER by rating DESC '
//        )
//            ->setParameter('from', $from)
//            ->setMaxResults(12)
//            ->getResult();
//
//        foreach ($items as $key => $item) {
//            $post = $em->getRepository('PokupoBlogBundle:Post')->find($item['id']);
//            if (!$post) {
//                continue;
//            }
//            if ($post->getStatus() != PostStatus::PUBLISHED) {
//                continue;
//            }
//
//            $item['post'] = $post;
//            $items[$key] = $item;
//        }
//
//        return $this->render(
//            'PokupoBlogBundle:/Report:mostViewed.html.twig',
//            array(
//                'items' => $items,
//                'period' => $this->getPeriod($request->get('period')),
//            )
//        );
//    }
//
//    /**
//     * @Route("/most-commented/{period}",
//     * name="_blog_report_most_commented",
//     * requirements={"period" = "yesterday|last-week|last-month|last-year|ever"})
//     * @Method({"GET"})
//     */
//    public function mostCommentedAction(Request $request)
//    {
//        $em = $this->getDoctrine()->getManager();
//        $from = $this->getFrom($request->get('period'));
//
//        $items = $em->createQuery(
//            ' SELECT c, p.id as id, COUNT(c.id) as comments '.
//            ' FROM PokupoBlogBundle:Comment c '.
//            ' JOIN c.post p '.
//            ' WHERE c.createdAt >= :from'.
//            ' GROUP BY c.post '.
//            ' ORDER by comments DESC '
//        )
//            ->setParameter('from', $from)
//            ->setMaxResults(12)
//            ->getResult();
//
//        foreach ($items as $key => $item) {
//            $post = $em->getRepository('PokupoBlogBundle:Post')->find($item['id']);
//            if (!$post) {
//                continue;
//            }
//            if ($post->getStatus() != PostStatus::PUBLISHED) {
//                continue;
//            }
//
//            $item['post'] = $post;
//            $items[$key] = $item;
//        }
//
//        return $this->render(
//            'PokupoBlogBundle:/Report:mostViewed.html.twig',
//            array(
//                'items' => $items,
//                'period' => $this->getPeriod($request->get('period')),
//            )
//        );
//    }
//
//    /**
//     * @param $period
//     * @return string
//     */
//    protected function getPeriod($period)
//    {
//        if ($period == 'yesterday') {
//            return 'ayer';
//        }
//        if ($period == 'last-week') {
//            return 'en la última semana';
//        }
//        if ($period == 'last-month') {
//            return 'en el último mes';
//        }
//        if ($period == 'last-year') {
//            return 'en el último año';
//        }
//        if ($period == 'ever') {
//            return 'desde el principio de los tiempos';
//        }
//    }
//
//    /**
//     * @param $period
//     * @return DateTime
//     */
//    protected function getFrom($period)
//    {
//        $from = new DateTime();
//        if ($period == 'yesterday') {
//            return $from->modify('-1 day');
//        }
//        if ($period == 'last-week') {
//            return $from->modify('-1 week');
//        }
//        if ($period == 'last-month') {
//            return $from->modify('-1 month');
//        }
//        if ($period == 'last-year') {
//            return $from->modify('-1 year');
//        }
//        if ($period == 'ever') {
//            return $from->modify('-100 year');
//        }
//    }
}

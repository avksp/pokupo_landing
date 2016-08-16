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

namespace Pokupo\BlogBundle\Manager;

use Pokupo\BlogBundle\Entity\Rating;
use Pokupo\BlogBundle\Event\RatingEvent;
use Pokupo\BlogBundle\Event\RatingEvents;
use Symfony\Component\HttpFoundation\Request;

/**
 * RatingManager
 */
class RatingManager extends AbstractManager
{
    /**
     * @param string  $entity
     * @param string  $id
     * @param string  $rate
     * @param Request $request
     *
     * @return Rating
     */
    public function create($entity, $id, $rate, Request $request)
    {
        $rating = new Rating();
        $rating->setEntityName($entity);
        $rating->setEntityId($id);
        $rating->setRating($rate);
        $rating->setIp($request->getClientIp());
        $rating->setUserAgent($request->headers->get('User-Agent'));

        return $rating;
    }


    public function persist(Rating $rating, $flush = true)
    {
        $this->em->persist($rating);
        $this->em->flush();

        $this->eventDispatcher->dispatch(
            RatingEvents::PERSISTED,
            new RatingEvent($rating)
        );
    }
}

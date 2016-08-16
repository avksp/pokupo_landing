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

namespace Pokupo\BlogBundle\Entity\Repository;

use Pokupo\BlogBundle\Entity\Banner;
use Doctrine\ORM\EntityRepository;

/**
 * BannerRepository
 */
class BannerRepository extends EntityRepository
{
    /**
     * @return bool|Banner
     */
    public function getRandomActive()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT b FROM PokupoBlogBundle:Banner b '.
            ' WHERE b.isPublished = 1 '
        );

        $banners = [];
        $items = $query->getResult();
        if (!$items) {
            return false;
        }
        foreach ($items as $banner) {
            $weight = $banner->getWeight();
            for ($i = 0; $i < $weight; $i++) {
                $banners[] = $banner;
            }
        }

        shuffle($banners);

        return array_pop($banners);
    }

    /**
     *
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getQueryBuilderForFilter()
    {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb
            ->select('b')
            ->from('PokupoBlogBundle:Banner', 'b')
            ->orderBy('b.createdAt', 'DESC');

        return $qb;
    }
}

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

use DateTime;
use Pokupo\BlogBundle\Entity\Post;
use Pokupo\BlogBundle\Entity\Tag;
use Doctrine\ORM\EntityRepository;
use Pokupo\BlogBundle\Model\PostStatus;
use Doctrine\ORM\Query;

/**
 * PostRepository
 */
class PostRepository extends EntityRepository
{
    /**
     * @param array $ids
     *
     * @return \Doctrine\ORM\AbstractQuery
     */
    public function getQueryForGetByIds(array $ids)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' WHERE p.id IN (:ids) '.
            ' AND p.status = '.PostStatus::PUBLISHED
        )
            ->setParameter('ids', $ids);

        return $query;
    }

    /**
     * @param array $ids
     *
     * @return array
     */
    public function getByIds(array $ids)
    {
        if (!count($ids)) {
            return [];
        }

        return $this->getQueryForGetByIds($ids)
            ->getResult();
    }

    /**
     *
     * @param \Pokupo\BlogBundle\Entity\Tag $tag
     * @param int                                       $limit
     *
     * @return \Doctrine\ORM\Query
     */
    public function getByTag(Tag $tag, $limit = self::POST_PER_PAGE)
    {
        $limit = (int)$limit;
        $query = $this->getQueryForGetByTag($tag, $limit)
            ->setMaxResults($limit);

        return $query->getResult();
    }

    /**
     *
     * @param int $limit
     *
     * @return array
     */
    public function get($limit = self::POST_PER_PAGE)
    {
        $limit = (int)$limit;
        $query = $this->getQueryForGet($limit)
            ->setMaxResults($limit);

        return $query->getResult();
    }

    /**
     * @return Query
     */
    public function getQueryForGet()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' ORDER BY p.promotion DESC, p.publishedAt DESC '
        );

        return $query;
    }

    /**
     * @param string $slug
     *
     * @return array
     */
    public function getByTagSlug($slug = '')
    {
        $query = $this->getQueryForGetByTagSlug($slug);

        return $query->getResult();
    }

    /**
     * @param Tag $tag
     *
     * @return \Doctrine\ORM\AbstractQuery
     */
    public function getQueryForGetByTag(Tag $tag)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' JOIN p.tags t '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' AND t.slug  = :slug '.
            ' ORDER BY p.publishedAt DESC '
        )
            ->setParameter('slug', $tag->getSlug());

        return $query;
    }

    /**
     * @param string $slug
     *
     * @return \Doctrine\ORM\AbstractQuery
     */
    public function getQueryForGetByTagSlug($slug = '')
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' JOIN p.tags t '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' AND t.slug = :slug '.
            ' ORDER BY p.publishedAt DESC '
        )
            ->setParameter('slug', $slug);

        return $query;
    }

    /**
     * @param Post     $post
     * @param int|bool $limit
     *
     * @return array
     */
    public function getLatestRelated(Post $post, $limit = false)
    {
        $limit = (int)$limit;
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' JOIN p.tags t '.
            ' JOIN t.posts p1 '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' AND p1 = :post '.
            ' AND p != :post '.
            ' ORDER BY p.publishedAt DESC '
        )
            ->setParameter('post', $post)
            ->setMaxResults($limit);
        $related = $query->getResult();
        if (count($related)) {
            return $related;
        } else {
            return $this->getLatest($limit);
        }
    }

    /**
     *
     * @param int $limit
     *
     * @return array
     */
    public function getLatest($limit = self::POST_PER_PAGE)
    {
        $limit = (int)$limit;

        return $this->get($limit);
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
            ->select('p')
            ->from('PokupoBlogBundle:Post', 'p')
            ->orderBy('p.createdAt', 'DESC');

        return $qb;
    }

    /**
     *
     * @return int
     */
    public function count()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT COUNT(p) FROM PokupoBlogBundle:Post p '
        );

        return $query->getSingleScalarResult();
    }

    /**
     *
     * @return int
     */
    public function countPublished()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT COUNT(p) FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status = '.PostStatus::PUBLISHED
        );

        return $query->getSingleScalarResult();
    }

    /**
     *
     * @param int $limit
     *
     * @return array
     */
    public function getUnPublished($limit = 50)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status != '.PostStatus::PUBLISHED.
            ' ORDER BY p.createdAt DESC '
        )
            ->setMaxResults($limit);

        return $query->getResult();
    }

    /**
     * Count published elements from date
     *
     * @param DateTime $date
     *
     * @return int
     */
    public function countFromDate(DateTime $date)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT COUNT(p) FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' AND p.createdAt >= :date '
        )
            ->setParameter('date', $date);

        return $query->getSingleScalarResult();
    }

    /**
     * Count published elements with source
     *
     * @return integer
     */
    public function countPublishedWithSource()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT COUNT(p) FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' AND p.source != :source '
        )
            ->setParameter('source', '');

        return $query->getSingleScalarResult();
    }

    /**
     *
     * @param int $limit
     *
     * @return array
     */
    public function getPublished($limit = 50)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' ORDER BY p.createdAt DESC '
        )
            ->setMaxResults($limit);

        return $query->getResult();
    }

    /**
     *
     * @param int $limit
     *
     * @return array
     */
    public function getPrePublished($limit = 50)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT p FROM PokupoBlogBundle:Post p '.
            ' WHERE p.status = '.PostStatus::PRE_PUBLISHED.
            ' ORDER BY p.createdAt DESC '
        )
            ->setMaxResults($limit);

        return $query->getResult();
    }

    /**
     * @return bool|mixed
     */
    public function getOneRandomPrePublished()
    {
        $items = $this->getPrePublished();
        if (!$items) {
            return false;
        }
        shuffle($items);

        return array_pop($items);
    }

    /**
     * @param string $query
     * @param int    $page
     * @param int    $perPage
     *
     * @return array|\Doctrine\ORM\QueryBuilder
     */
    public function getSearchBuilder($query, $page = 1, $perPage = 10)
    {
        $tokens = $this->tokenize($query);
        if (!count($tokens)) {
            return [];
        }

        $name = [];
        $intro = [];
        $content = [];

        $qb = $this->createQueryBuilder('p');
        $qb->where('p.status = 1');

        foreach ($tokens as $token) {
            $tkn = $qb->expr()->literal(sprintf('%%%s%%', $token));
            $name[] = $qb->expr()->like('p.name', $tkn);
            $intro[] = $qb->expr()->like('p.intro', $tkn);
            $content[] = $qb->expr()->like('p.content', $tkn);
        }

        if (count($name) === 1) {
            $qb->andWhere(
                $qb->expr()->orX(
                    call_user_func_array([$qb->expr(), 'orX'], $name),
                    call_user_func_array([$qb->expr(), 'orX'], $intro),
                    call_user_func_array([$qb->expr(), 'orX'], $content)
                )
            );
        } else {
            $qb->andWhere(
                $qb->expr()->andX(
                    call_user_func_array([$qb->expr(), 'orX'], $name),
                    call_user_func_array([$qb->expr(), 'orX'], $intro),
                    call_user_func_array([$qb->expr(), 'orX'], $content)
                )
            );
        }

        $start = ($page - 1) * $perPage;

        $qb->setFirstResult($start);
        $qb->setMaxResults($perPage);

        return $qb;
    }

    /**
     * @param string $query
     * @param int    $page
     * @param int    $perPage
     *
     * @return mixed
     */
    public function search($query, $page = 1, $perPage = 10)
    {
        return $this->getQueryForSearch($query, $page, $perPage)->getQuery()->getResult();
    }

    /**
     * @return array
     */
    public function getArchiveItems()
    {
        $query = $this->getEntityManager()
            ->createQuery(
                ' SELECT COUNT(p) as n, '.
                ' SUBSTRING(p.publishedAt, 1, 4) as year, '.
                ' SUBSTRING(p.publishedAt, 6, 2) as month '.
                ' FROM PokupoBlogBundle:Post p '.
                ' WHERE p.status = '.PostStatus::PUBLISHED.
                ' GROUP BY year, month '.
                ' ORDER BY year DESC, month DESC '
            );
        $results = $query->getResult();
        $items = [];
        foreach ($results as $item) {
            if (!$item['year']) {
                continue;
            }
            if (!$item['month']) {
                continue;
            }
            if (!isset($items[$item['year']])) {
                $items[$item['year']] = [];
            }
            array_push(
                $items[$item['year']],
                [
                    'n' => $item['n'],
                    'date' => new \DateTime($item['year'].'-'.$item['month'].'-01'),
                ]
            );
        }

        return $items;
    }

    /**
     * Tokenize string for searching.
     * This should return all the numbers from
     *
     * @param string $query
     *
     * @return string[]
     */
    protected function tokenize($query)
    {
        preg_match_all('#\b\w{3,}\b#mi', $query, $matches);

        return is_array($matches) && count($matches)
            ? $matches[0]
            : [];
    }
}

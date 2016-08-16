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

use Pokupo\BlogBundle\Entity\Tag;
use Pokupo\BlogBundle\Model\PostStatus;
use Doctrine\ORM\EntityRepository;

/**
 * TagRepository
 */
class TagRepository extends EntityRepository
{

    /**
     * @param int $limit
     *
     * @return array
     */
    public function get($limit = self::TAGS_PER_PAGE)
    {
        $limit = (int)$limit;
        $query = $this->getQueryForGet($limit)
            ->setMaxResults($limit);

        return $query->getResult();
    }

    /**
     *
     * @return \Doctrine\ORM\Query
     */
    public function getQueryForGet()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT t FROM PokupoBlogBundle:Tag t '.
            ' WHERE t.items >= 1 '.
            ' ORDER BY t.items DESC '
        );

        return $query;
    }

    /**
     * @param  int $limit
     *
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getQueryBuilderForGet($limit = self::TAGS_PER_PAGE)
    {
        $limit = (int)$limit;
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder()
            ->select('t')
            ->from('PokupoBlogBundle:Tag', 't')
            ->orderBy('t.items', 'DESC')
            ->setMaxResults($limit);

        return $qb;
    }

    /**
     *
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getQueryBuilderForFilter()
    {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder()
            ->select('t')
            ->from('PokupoBlogBundle:Tag', 't')
            ->orderBy('t.items', 'DESC');

        return $qb;
    }

    /**
     *
     * @param  \Pokupo\BlogBundle\Entity\Tag $t
     *
     * @return \Doctrine\ORM\Query
     */
    public function getQueryForCountItemsForTag(Tag $t)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT COUNT(p) FROM PokupoBlogBundle:Post p '.
            ' JOIN p.tags t '.
            ' WHERE p.status = '.PostStatus::PUBLISHED.
            ' AND t = :t '.
            ' ORDER BY p.createdAt DESC '
        )
            ->setParameter('t', $t);

        return $query;
    }

    /**
     *
     * @param  \Pokupo\BlogBundle\Entity\Tag $tag
     *
     * @return integer
     */
    public function indexTagItemsForTag(Tag $tag)
    {
        $em = $this->getEntityManager();
        $n = $this->getQueryForCountItemsForTag($tag)
            ->getSingleScalarResult();
        $tag->setItems($n);
        $em->persist($tag);
        $em->flush();
    }

    /**
     * Set total items for all tags
     */
    public function indexTagItems()
    {
        foreach ($this->findAll() as $tag) {
            $this->indexTagItemsForTag($tag);
        }
    }

    /**
     * @return mixed
     */
    public function count()
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT COUNT(t) FROM PokupoBlogBundle:Tag t '
        );

        return $query->getSingleScalarResult();
    }

    /**
     *
     * @param  string $slug
     *
     * @return \Pokupo\BlogBundle\Entity\Tag
     */
    public function getOneBySlug($slug)
    {
        $em = $this->getEntityManager();
        $query = $em->createQuery(
            ' SELECT t FROM PokupoBlogBundle:Tag t '.
            ' WHERE t.slug = :slug'.
            ' ORDER BY t.createdAt DESC '
        )
            ->setParameter('slug', $slug);

        return $query->getOneOrNullResult();
    }

    /**
     *
     * @param  string $tagName
     *
     * @return \Pokupo\BlogBundle\Entity\Tag
     */
    public function getOneByName($tagName)
    {
        $em = $this->getEntityManager();
        $name = strtolower($tagName);
        $query = $em->createQuery(
            ' SELECT t FROM PokupoBlogBundle:Tag t '.
            ' WHERE t.name = :name'
        )
            ->setParameter('name', $name);

        return $query->getOneOrNullResult();
    }

    /**
     *
     * @param  string $tagName
     *
     * @return \Pokupo\BlogBundle\Entity\Tag
     */
    public function getOrCreateByName($tagName)
    {
        $em = $this->getEntityManager();
        $tag = $this->getOneByName($tagName);
        if (!$tag) {
            $name = strtolower($tagName);
            $tag = new Tag();
            $tag->setName($name);
            $em->persist($tag);
            $em->flush();
        }

        return $tag;
    }

    public function getTagsLike($search)
    {
        $em = $this->getEntityManager();
        $query = $em->createQueryBuilder()
            ->select('t')
            ->from('PokupoBlogBundle:Tag', 't')
            ->where('t.name LIKE :name')
            ->setParameter('name', '%' . $search . '%')
            ->getQuery();

        return $query->getResult();
    }
}

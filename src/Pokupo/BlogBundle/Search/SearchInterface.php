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

namespace Pokupo\BlogBundle\Search;

use Pokupo\BlogBundle\Entity\Post;
use Knp\Component\Pager\Pagination\PaginationInterface;

/**
 *
 * Description of SearchInterface
 *
 * @author : Daniel González <daniel@desarrolla2.com>
 */
interface SearchInterface
{
    /**
     * @param  string $query
     * @param  int    $page
     * @return array
     */
    public function search($query, $page);

    /**
     * @param  Post   $post
     * @param  int    $limit
     * @return Post[]
     */
    public function related(Post $post, $limit = 3);

    /**
     * @return array
     */
    public function getItems();

    /**
     * @return PaginationInterface
     */
    public function getPagination();
}

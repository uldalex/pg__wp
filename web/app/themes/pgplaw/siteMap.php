<?php
/*
Template Name: Карта сайта
*/
?>
<?php get_header(); ?>
<?php query_posts('showposts=1000'); ?>
<main id="content" role="main">
<div class="container">
    <ul itemprop="mainContentOfPage">
    <?php while ( have_posts() ) : the_post(); ?>
    <li >
        <a target="_blank" href="<?php the_permalink() ?>"><?php the_title(); ?></a>
    </li>
    <?php endwhile; ?>
    </ul>
</div>
</main>
<?php get_footer(); ?>
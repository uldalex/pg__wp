<?php get_header(); ?>
<main id="content" role="main">
    <div class="container">
        <div class="row">
                <div class="col-md-12">
                <?php the_breadcrumb(); ?>
                </div>
        </div>
    </div>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<div class="container">
<?php get_template_part( 'entry' ); ?>
<?php endwhile; endif; ?>
<footer class="footer">
<?php get_template_part( 'nav', 'below-single' ); ?>
</footer>
</div>
</main>
<?php get_footer(); ?>
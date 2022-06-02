<?php
/*
Template Name: Шаблон статических страниц
*/ 
get_header(); ?>
<main id="content" role="main">
    <div class="container">
        <div class="row">
          <div class="col-md-12">
              <?php the_breadcrumb(); ?>
          </div>
        </div> 
        <?php 
          $sitebar = get_post_meta( get_the_ID(), '_sitebar', true );
          if ( is_active_sidebar( $sitebar ) ) { ?>
        <div class="row overflow-x-hidden">
          <div class="col-md-4">

            <div id="true-side" class="sitebar">
            <?php
                wp_nav_menu( [
                'theme_location' => 'right-menu',
                'depth'          => 2,
                'container'      => false,
                'fallback_cb'    => false,
                'echo'           => true,
                'walker'         => new WP_Bootstrap_Navwalker(),
                'bem_block'      => 'main-nav',
                'items_wrap'     => '
                    <nav class="nav">
                    <ul class="nav__list">%3$s</ul>
                    </nav>
                ',
                ] );
                ?>
               

            </div>
        
          </div>
          <div class="col-md-8">
          <?php } else { ?>
            <div class="col-md-12"> 
          <?php } ?>
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" >
                <header class="header">
                <h1 class="entry-title" itemprop="name"><?php the_title(); ?></h1> <?php edit_post_link(); ?>
                </header>
                <div class="entry-content" itemprop="mainContentOfPage">
                <?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'full', array( 'itemprop' => 'image' ) ); } ?>
                <?php the_content(); ?>
                <div class="entry-links"><?php wp_link_pages(); ?></div>
                </div>
            </article>
          <?php endwhile; endif; ?>
          </div>
        </div>
    </div>
</main>
<?php get_footer(); ?>
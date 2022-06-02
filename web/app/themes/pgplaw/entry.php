<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<div class="edit_post_link"><?php if( current_user_can( 'edit_posts' ) ) {echo '<a href="'. get_edit_post_link() .'">Редактировать новост</a>';} ?></div>
<header>
<?php if ( is_singular() ) { echo '<h1 class="entry-title" itemprop="headline">'; } else { echo '<h2 class="entry-title">'; } ?>
<h1><?php the_title(); ?></h1>
<?php if ( is_singular() ) { echo '</h1>'; } else { echo '</h2>'; } ?>
<?php if ( !is_search() ) { get_template_part( 'entry', 'meta' ); } ?>
</header>
<?php get_template_part( 'entry', ( is_front_page() || is_home() || is_front_page() && is_home() || is_archive() || is_search() ? 'summary' : 'content' ) ); ?>
<?php if ( is_singular() ) { get_template_part( 'entry-footer' ); } ?>
</article>
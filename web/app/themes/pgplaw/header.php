<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php pg_schema_type(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<?php wp_head(); ?>
<script>
    document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
function cth(c){document.documentElement.classList.add(c)}
'ontouchstart' in window?cth('touch'):cth('no-touch');
if(typeof InstallTrigger!=='undefined')cth('firefox');
if(/constructor/i.test(window.HTMLElement)||(function(p){return p.toString()==="[object SafariRemoteNotification]"})(!window['safari']||(typeof safari!=='undefined'&&safari.pushNotification)))cth('safari');
if(/*@cc_on!@*/false||!!document.documentMode)cth('ie');
if(!(/*@cc_on!@*/false||!!document.documentMode)&&!!window.StyleMedia)cth('edge');
if(!!window.chrome&&(!!window.chrome.webstore||!!window.chrome.runtime))cth('chrome');
if(~navigator.appVersion.indexOf("Win"))cth('windows');
if(~navigator.appVersion.indexOf("Mac"))cth('osx');
if(~navigator.appVersion.indexOf("Linux"))cth('linux');
</script>
</head>
<body <?php body_class(); ?>><noscript>У вас отключен JavaScript. Это пугает.</noscript>
<?php $currentLanguage = get_bloginfo('language'); wp_body_open(); ?>
<div id="preloader">
    <div class="preloader_wrapper" >
        <div>
            <?php _e( 'load', 'pg' ); ?>
        </div>
            <img src="<?php echo get_template_directory_uri()?>/img/preloader.svg">
    </div>
</div>
<div class="page__inner">
    <div class="page__content hfeed">
        <header class="page-header" role="banner">
            <div class="page-header__search-panel" id="search-fixed">
                <div class="page-header__inner">
                    <h4><?php _e( 'SEARCH ON SITE', 'pg' ); ?></h4>
                    <form action="/search/" method="get">
                    <div class="row">
                        <div class="col-xxl-5 col-xl-5 col-md-6"><input type="text" name="q" placeholder="<?php _e( 'Enter your request', 'pg' ); ?>" /></div>
                        <div class="col-xxl-2 col-xl-2 col-md-2"><input type="submit" value="<?php _e( 'Go', 'pg' ); ?>" /></div>
                    </div>
                    </form><a class="page-header__search-close solid" id="search-close" href="#"><?php _e( 'Close', 'pg' ); ?></a>
                </div>
            </div>
            <div class="page-header__inner">
                <div class="page-header__row">
                    <div class="page-header__left-part">
                    <ul class="page-header__list">
                        <li><a href="tel:+74957670007" aria-label="<?php _e( 'Coll', 'pg' ); ?>"><?php echo nl2br(get_theme_mod('tel')); ?></a></li>
                        <li><a href="mailto:<?php _e( 'post', 'pg' ); ?>" aria-label="<?php _e( 'post', 'pg' ); ?>"><?php echo nl2br(get_theme_mod('mail')); ?></a></li>
                    </ul>
                    </div>

                    <a class="logo" href="<?= esc_url( home_url( '/' ) ) ?>"><img src="<?php echo get_template_directory_uri()?>/img/logo.svg" alt="Logo" width="126" height="36" /></a>

                    <div class="page-header__right-part">
                    <ul class="page-header__list">
                        <li> <a class="page-header__search-link" id="search-open" href="#" aria-label="<?php _e( 'Search', 'pg' ); ?>"><?php _e( 'Search', 'pg' ); ?></a></li>
                        <li>
                            <?php wp_nav_menu( array('menu_class'=>'menu', 'theme_location'=>'languages-menu', 'after'=>' ' ) ); ?>
                        </li>  
                    <?php if(is_user_logged_in()) {?>
                        <li>
                            <div class="page-header__authorize-link authorized" id="lk"><a  aria-label="<?php _e( 'Personal Area', 'pg' ); ?>"><?php _e( 'Personal account', 'pg' ); ?></a>
                        <div class="user-panel">
                            <ul>
                                <li> <a href="/login/" aria-label="<?php _e( 'lk', 'pg' ); ?>"><?php _e( 'Personal Area', 'pg' ); ?></a></li>
                                <li><a href="/?logout=yes" aria-label="<?php _e( 'Logout', 'pg' ); ?>"><?php _e( 'Logout', 'pg' ); ?></a></li>
                            </ul>
                        </div>
                        </div>
                        </li>
                    <?php }else {?>
                    <li>
                        <a class="page-header__authorize-link not-authorized" href="#login" data-toggle="modal" data-target="#login" aria-label="<?php _e( 'Login', 'pg' ); ?>"><?php _e( 'Login', 'pg' ); ?></a>
                    </li>
                    <?php } ?>
                        </li>
                    </ul>
                </div>
                    <button class="burger main-nav__toggler" aria-label="Показать содержание" data-target-id="nav" data-target-class-toggle="main-nav--open"><span>Показать содержание</span></button>
                    <div class="<?php 
                    if ( is_front_page() || is_home() || is_front_page() && is_home() ) {
                        echo 'main-nav__wrapper'; }else{ 
                            echo 'main-nav__wrapper--inside';
                            } ?>"> 

                <?php
                wp_nav_menu( [
                'theme_location' => 'main-menu',
                'depth'          => 2,
                'container'      => false,
                'fallback_cb'    => false,
                'echo'           => true,
                'walker'         => new BEM_Walker_Nav_Menu(),
                'bem_block'      => 'main-nav',
                'items_wrap'     => '
                    <nav class="main-nav">
                    <ul class="main-nav__list">%3$s</ul>
                    </nav>
                ',
                ] );
                ?>
                </div>
                </div>
            </div>
        </header>
        <?php  
        if ( is_front_page() || is_home() || is_front_page() && is_home() ) {
           if($currentLanguage == "ru-RU"){ require_once 'inc/banner.php';  }
           else if($currentLanguage == "en-US") {require_once 'inc/banner_en.php';  }
        }  
        ?>
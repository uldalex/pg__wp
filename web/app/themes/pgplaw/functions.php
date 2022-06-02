<?php
add_action( 'after_setup_theme', 'pg_setup' );
## чистим лишнее
function pg_setup() {
load_theme_textdomain( 'pg', get_template_directory() . '/languages' );
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'responsive-embeds' );
add_theme_support( 'html5', array( 'search-form', 'navigation-widgets' ) );
add_theme_support( 'woocommerce' );
## Отключу wlwmanifest
remove_action( 'wp_head', 'wlwmanifest_link' );
## Отключу мусор из head
remove_action('wp_head', 'wp_generator');
remove_action('wp_head','wp_oembed_add_discovery_links', 10 );
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head','rel_canonical');
remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');
remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' );
remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
## Отключу гутенберг
function remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-block-style' ); // REMOVE WOOCOMMERCE BLOCK CSS
    wp_dequeue_style( 'global-styles' ); // REMOVE THEME.JSON
    }
    add_action( 'wp_enqueue_scripts', 'remove_wp_block_library_css', 100 );
add_action('after_setup_theme', function () {
	remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
	remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
}, 10, 0);
## Отключим эмодзи
function disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' ); 
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); 
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
    add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
   }
   add_action( 'init', 'disable_emojis' );
   function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
    return array();
    }
   }
   function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
    if ( 'dns-prefetch' == $relation_type ) {
    $emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
   
   $urls = array_diff( $urls, array( $emoji_svg_url ) );
    }
   return $urls;
   }
## Изменение текста в подвале админ-панели
add_filter('admin_footer_text', 'footer_admin_func');
function footer_admin_func () {
  echo 'Разработка темы: <a href="#" target="_blank">uldalex</a>. Для <a href="http://wordpress.org" target="_blank">Пепеляев Групп</a>.';
}
## менюшечки
register_nav_menus( array( 'main-menu' => esc_html__( 'Главное меню', 'pg' ) ) );
register_nav_menus( array( 'languages-menu' => esc_html__( 'Languages', 'pg' ) ) );
register_nav_menus( array( 'right-menu' => esc_html__( 'Right menu', 'pg' ) ) );
require_once 'inc/BEM_Walker_Nav_Menu.php';
require_once 'inc/wp-bootstrap-navwalker.php';
## языковые файлы
load_theme_textdomain('pg', get_template_directory_uri().'/languages');
}

require_once 'inc/admin-functions.php';

function pg_enqueue_style() {
    wp_enqueue_style( 'header', get_template_directory_uri().'/css/header.css', '' );
    wp_enqueue_style( 'editor-style', get_template_directory_uri().'/css/editor-style.css', '' );
    if ( is_front_page() || is_home() || is_front_page() && is_home() ) { 
        wp_enqueue_style( 'splide', get_template_directory_uri().'/css/splide.css', '' );
        wp_enqueue_style( 'home', get_template_directory_uri().'/css/home.css', '' );
        } else {
            wp_enqueue_style( 'pages', get_template_directory_uri().'/css/pages.css', '' );   
        }
        if( is_page_template('about_company.php' ) ){
            wp_enqueue_style( 'about_company', get_template_directory_uri().'/css/about_company.css', '' );  
        }
    wp_enqueue_style( 'mediastyle', get_template_directory_uri().'/css/media.css', '' );

}
add_action('wp_enqueue_scripts', 'pg_enqueue_style');
add_action( 'wp_enqueue_scripts', 'pg_enqueue_scripts' );
function pg_enqueue_scripts() {
wp_register_script( 'jq', get_stylesheet_directory_uri() . '/js/jquery.min.js', '', null, true);  
wp_enqueue_script( 'jq' );
wp_register_script( 'preloader', get_stylesheet_directory_uri() . '/js/preloader.js','', null, true);  
wp_enqueue_script( 'preloader' );
wp_register_script( 'header', get_stylesheet_directory_uri() . '/js/header.js', '', null, true );  
wp_enqueue_script( 'header' );
if ( is_front_page() || is_home() || is_front_page() && is_home() ) { 
    wp_register_script( 'splide', get_stylesheet_directory_uri() . '/js/splide.min.js', '', null, true );  
    wp_enqueue_script( 'splide' );
    wp_register_script( 'home', get_stylesheet_directory_uri() . '/js/home.js', '', null, true );  
    wp_enqueue_script( 'home' );  
} else {
    wp_register_script( 'home', get_stylesheet_directory_uri() . '/js/home.js', '', null, true );  
    wp_enqueue_script( 'home' ); 
}
}

function pg_schema_type() {
$schema = 'https://schema.org/';
if ( is_single() ) {
$type = "Article";
} elseif ( is_author() ) {
$type = 'ProfilePage';
} elseif ( is_search() ) {
$type = 'SearchResultsPage';
} else {
$type = 'WebPage';
}
echo 'itemscope itemtype="' . $schema . $type . '"';
}
add_filter( 'nav_menu_link_attributes', 'pg_schema_url', 10 );
function pg_schema_url( $atts ) {
$atts['itemprop'] = 'url';
return $atts;
}
if ( !function_exists( 'pg_wp_body_open' ) ) {
function pg_wp_body_open() {
do_action( 'wp_body_open' );
}
}
add_action( 'wp_body_open', 'pg_skip_link', 5 );
function pg_skip_link() {
echo '<a href="#content" class="skip-link screen-reader-text">' . esc_html__( 'Skip to the content', 'pg' ) . '</a>';
}
add_filter( 'the_content_more_link', 'pg_read_more_link' );
function pg_read_more_link() {
if ( !is_admin() ) {
return ' <a href="' . esc_url( get_permalink() ) . '" class="more-link">' . sprintf( __( '...%s', 'pg' ), '<span class="screen-reader-text">  ' . esc_html( get_the_title() ) . '</span>' ) . '</a>';
}
}
## закроем возможность публикации через xmlrpc.php
add_filter('xmlrpc_enabled', '__return_false');
add_action('after_setup_theme', function(){
	if ( ! is_admin() && ! current_user_can('manage_options') )
		show_admin_bar( false );
});

## виджеты
add_action( 'widgets_init', 'pg_widgets_init' );
function pg_widgets_init() {
register_sidebar( array(
'name' => esc_html__( 'Sidebar Widget Area', 'pg' ),
'id' => 'primary-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => '</li>',
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );
register_sidebar( array(
    'name' => esc_html__( 'Сайтбар меню справа', 'pg' ),
    'id' => 'menu-right',
    'before_widget' => '',
    'after_widget' => '',
    'before_title' => '',
    'after_title' => '',
    ) );
}

## поля в настройках страницы
add_action('customize_register', 'dco_customize_register');
function dco_customize_register($wp_customize) {
    $wp_customize->add_section('header', array(
        'title' => 'Шапка сайта',
        'priority' => 1,
    ));
    $setting_tel = 'tel';
    $setting_mail = 'mail';
    $wp_customize->add_setting($setting_tel, array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage'
    ));
    $wp_customize->add_control($setting_tel, array(
        'section' => 'header',
        'type' => 'text',
        'label' => 'Телефон',
    ));
    $wp_customize->add_setting($setting_mail, array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
        'transport' => 'postMessage'
    ));
    $wp_customize->add_control($setting_mail, array(
        'section' => 'header',
        'type' => 'text',
        'label' => 'Электронная почта',
    ));
}

//Хлебные крошечки
function the_breadcrumb() {
    if ( !is_home() ) {
    echo '<div id="breadcrumb"> <ul class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList"><li class="first" itemprop="itemListElement" itemscope
    itemtype="http://schema.org/ListItem"><a itemscope itemtype="http://schema.org/Thing"
    itemprop="item" href="';
    echo get_option('home');
    echo '"><span itemprop="name">';
    _e( 'Home', 'pg' );
    echo '</span></a><meta itemprop="position" content="1" /></li><span class="delimiter">&nbsp;&nbsp;•&nbsp;&nbsp; </span>';
    }
    if ( is_category() ||is_singular( 'post' ) ) {
    $cats = get_the_category();
    $cat = $cats[0];
    $output ='';
    $output .= '<a itemscope itemtype="http://schema.org/Thing"
    itemprop="item" href="'.get_category_link($cat->term_id).'"><span itemprop="name">
    '.$cat->name.'</a></span>';
    echo '<li itemprop="itemListElement" itemscope
    itemtype="http://schema.org/ListItem">'.$output.'<meta itemprop="position" content="2" /></li>';
    }
    if ( is_singular( 'team' ) ) {
        $output ='';
        $output .= '<a itemscope itemtype="http://schema.org/Thing"
        itemprop="item" href="/to-get-the-team/"><span itemprop="name">
        Команда</a></span>';
        echo '<li itemprop="itemListElement" itemscope
        itemtype="http://schema.org/ListItem">'.$output.'<meta itemprop="position" content="2" /></li>';
    }
    if ( is_singular( 'office' ) ) {
        $output ='';
        $output .= '<a itemscope itemtype="http://schema.org/Thing"
        itemprop="item" href="/geography-of-services/"><span itemprop="name">
        ГЕОГРАФИЯ УСЛУГ </a></span>';
        echo '<li itemprop="itemListElement" itemscope
        itemtype="http://schema.org/ListItem">'.$output.'<meta itemprop="position" content="2" /></li>';
    }
    if(is_single())
    {
    echo '<span class="delimiter">&nbsp;&nbsp;•&nbsp;&nbsp; </span><li itemprop="itemListElement" itemscope
    itemtype="http://schema.org/ListItem"><a itemscope itemtype="http://schema.org/Thing"
    itemprop="item" href="'.get_permalink().'"><span itemprop="name">';the_title();echo '</span></a><meta itemprop="position" content="3" /></li>';
    }
    if(is_page())
    {
    echo '<li itemprop="itemListElement" itemscope
    itemtype="http://schema.org/ListItem"><a itemscope itemtype="http://schema.org/Thing"
    itemprop="item" href="'.get_permalink().'"><span itemprop="name">';the_title();echo '</span></a><meta itemprop="position" content="3" /></li>';
    }
    echo "</ul></div>";
    }

/*авторизация */
add_action( 'init', 'ajax_login_init' );
function ajax_login_init() {
    wp_register_script( 'ajax-login-script', get_stylesheet_directory_uri() . '/js/ajax-login-script.js', array('jquery') );
    wp_enqueue_script( 'ajax-login-script' );
    wp_localize_script( 'ajax-login-script', 'ajax_login_object', array(
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'redirecturl' => home_url(),
        'loadingmessage' => __( 'Sending user info, please wait...', 'pg' )
    ));

    // Enable the user with no privileges to run ajax_login() in AJAX
    add_action( 'wp_ajax_nopriv_ajaxlogin', 'ajax_login' );
}

// Check if users input information is valid
function ajax_login() {
    // First check the nonce, if it fails the function will break
    check_ajax_referer( 'ajax-login-nonce', 'security' );

//Nonce is checked, get the POST data and sign user on
$info = array();
    $info['user_login'] = $_POST['username'];
    $info['user_password'] = $_POST['password'];
    $info['remember'] = true;

$user_signon = wp_signon( $info, false );
if ( is_wp_error( $user_signon )) {
    echo json_encode( array( 'loggedin'=>false, 'message'=>__( 'Wrong username or password!','pg' )));
} else {
    echo json_encode( array( 'loggedin'=>true, 'message'=>__('Login successful, redirecting...', 'pg' )));
}

die();
}


## Тип поста команда
if ( ! function_exists('add_team_post_type') ) {
    function add_team_post_type() {
      $labels = array(
        'name'                  => 'Команда',
        'singular_name'         => 'Сотрудник',
        'menu_name'             => 'Команда',
        'name_admin_bar'        => 'Список сотрудников',
        'archives'              => 'Архив сотрудников',
        'attributes'            => 'Аттрибуты сотрудника',
        'parent_item_colon'     => 'Команда',
        'all_items'             => 'Все сотрудники',
        'add_new_item'          => 'Доавить нового сотрудника',
        'add_new'               => 'Добавить сотрудника',
        'new_item'              => 'Новый сотрудник',
        'edit_item'             => 'Редактировать сотрудника',
        'update_item'           => 'Обновить сотрудника',
        'view_item'             => 'Смотреть сотрудника',
        'view_items'            => 'Смотреть сотрудников',
        'search_items'          => 'Найти сотрудника',
        'not_found'             => 'Не найдено',
        'not_found_in_trash'    => 'В корхине не найдено',
        'featured_image'        => 'Избранное фото',
        'set_featured_image'    => 'Установить фото сотрудника',
        'remove_featured_image' => 'Удалить фото сотрудника',
        'use_featured_image'    => 'Использовать в качестве фото сотрудника',
        'insert_into_item'      => 'Добавить к сотруднику',
        'uploaded_to_this_item' => 'Добавить к этому сотруднику',
        'items_list'            => 'Список сотрудников',
        'items_list_navigation' => 'Items list navigation',
        'filter_items_list'     => 'Фильтр сотрудников',
      );
      $rewrite = array(
        'slug'                  => 'to-get-the-team',
        'with_front'            => true,
        'pages'                 => true,
        'feeds'                 => true,
        
      );
      $args = array(
        'label'                 => 'Сотрудник',
        'description'           => 'Описание сотрудника',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor','thumbnail','excerpt','trackbacks','custom-fields', 'page-attributes' ),
        'hierarchical'          => true,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'show_in_admin_bar'     => false,
        'show_in_nav_menus'     => true,
        'menu_icon'             => 'dashicons-businessperson',
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'team',
        'rewrite'               => $rewrite,
        'capability_type'       => 'post',
      );
      register_post_type( 'team', $args );
    
    }
   
    
    }
     add_action( 'init', 'add_team_post_type', 0 );
## Тип поста офис
if ( ! function_exists('add_office_post_type') ) {
    function add_office_post_type() {
      $labels = array(
        'name'                  => 'Офисы компании',
        'singular_name'         => 'Офис',
        'menu_name'             => 'Офисы',
        'name_admin_bar'        => 'Список офисов',
        'archives'              => 'Архив офисов',
        'attributes'            => 'Аттрибуты офиса',
        'parent_item_colon'     => 'Офисы',
        'all_items'             => 'Все офисы',
        'add_new_item'          => 'Доавить новый офис',
        'add_new'               => 'Добавить офис',
        'new_item'              => 'Новый офис',
        'edit_item'             => 'Редактировать офис',
        'update_item'           => 'Обновить офис',
        'view_item'             => 'Смотреть офис',
        'view_items'            => 'Смотреть офисы',
        'search_items'          => 'Найти офис',
        'not_found'             => 'Не найдено',
        'not_found_in_trash'    => 'В корхине не найдено',
        'featured_image'        => 'Избранное фото',
        'set_featured_image'    => 'Установить фото офиса',
        'remove_featured_image' => 'Удалить фото офиса',
        'use_featured_image'    => 'Использовать в качестве фото офиса',
        'insert_into_item'      => 'Добавить к офису',
        'uploaded_to_this_item' => 'Добавить к этому офису',
        'items_list'            => 'Список офисов',
        'items_list_navigation' => 'Items list navigation',
        'filter_items_list'     => 'Фильтр офисов',
      );
      $rewrite = array(
        'slug'                  => 'office',
        'with_front'            => true,
        'pages'                 => true,
        'feeds'                 => true,
      );
      $args = array(
        'label'                 => 'Офис',
        'description'           => 'Описание офиса',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor','thumbnail','excerpt','trackbacks','custom-fields', 'page-attributes' ),
        'hierarchical'          => true,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'show_in_admin_bar'     => false,
        'show_in_nav_menus'     => true,
        'menu_icon'             => 'dashicons-location',
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'office',
        'rewrite'               => $rewrite,
        'capability_type'       => 'page',
      );
      register_post_type( 'office', $args );
    
    }
   
    
    }
     add_action( 'init', 'add_office_post_type', 0 );
     
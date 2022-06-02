const ready = function (fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){

  // Добавление/удаление модификаторов при фокусировке на ссылочном элементе
  var linkClassName = 'main-nav__link';
  var linkClassNameShowChild = 'main-nav__item--show-child';
  var findLinkClassName = new RegExp(linkClassName);
  // Слежение за всплывшим событием focus (нужно добавить класс, показывающий потомков)
  document.addEventListener('focus', function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Добавим классы, показывающие списки вложенных уровней, на всех родителей
      var parents = getParents(event.target, '.main-nav__item');
      for (var i = 0; i < parents.length; i++) {
        parents[i].classList.add(linkClassNameShowChild);
      }
    }
  }, true);
  // Слежение за всплывшим событием blur (нужно убрать класс, показывающий потомков)
  document.addEventListener('blur', function(event) {
    // Если событие всплыло от одной из ссылок гл. меню
    if (findLinkClassName.test(event.target.className)) {
      // Уберем все классы, показывающие списки 2+ уровней
      var parents = document.querySelectorAll('.'+linkClassNameShowChild)
      for (var i = 0; i < parents.length; i++) {
        parents[i].classList.remove(linkClassNameShowChild);
      }
    }
  }, true);



  // eslint-disable
  /*! getParents.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getParents */
  /**
   * Get all of an element's parent elements up the DOM tree
   * @param  {Node}   elem     The element
   * @param  {String} selector Selector to match against [optional]
   * @return {Array}           The parent elements
   */
  var getParents = function ( elem, selector ) {

      // Element.matches() polyfill
      if (!Element.prototype.matches) {
          Element.prototype.matches =
              Element.prototype.matchesSelector ||
              Element.prototype.mozMatchesSelector ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.oMatchesSelector ||
              Element.prototype.webkitMatchesSelector ||
              function(s) {
                  var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                      i = matches.length;
                  while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line
                  return i > -1;
              };
      }

      // Setup parents array
      var parents = [];

      // Get matching parent elements
      for ( ; elem && elem !== document; elem = elem.parentNode ) {

          // Add matching parents to array
          if ( selector ) {
              if ( elem.matches( selector ) ) {
                  parents.push( elem );
              }
          } else {
              parents.push( elem );
          }

      }

      return parents;

  };

});
//бургер
ready(function(){

  var burgers = document.querySelectorAll('.burger');

  for (var i = 0; i < burgers.length; i++) {
    var burger = burgers[i];
    burger.addEventListener('click', showBurgerTarget);
  }

  function showBurgerTarget() {
    var targetId = this.getAttribute('data-target-id');
    var targetClassToggle = this.getAttribute('data-target-class-toggle');
    if (targetId && targetClassToggle) {
      this.classList.toggle('burger--close');
      document.getElementById(targetId).classList.toggle(targetClassToggle);
    }
  }

});
/*выпадашки в шапке*/
 jQuery( document ).ready(function($) {
  $(document).on('mouseenter', '.page-header__launguage-link', function(){
    $('.page-header__launguage-link').addClass('active')
    $('.launguage-panel').addClass('open')
  })
  $(document).on('mouseleave', '.page-header__launguage-link', function(){
    $('.page-header__launguage-link').removeClass('active')
    $('.launguage-panel').removeClass('open')
  })
  $('.page-header__launguage-link, .launguage-panel a').on('click', function(){
   $('.page-header__launguage-link').toggleClass('active')
   $('.launguage-panel').toggleClass('open')
   return false;
 })
 $(document).on('mouseenter', '#lk', function(){
  $('#lk').addClass('active')
  $('.user-panel').addClass('open')
})
$(document).on('mouseleave', '#lk', function(){
  $('#lk').removeClass('active')
  $('.user-panel').removeClass('open')
})
 $('#lk, .user-panel a').on('click', function(){
  $('#lk').toggleClass('active')
  $('.user-panel').toggleClass('open');
  return false;
})
$('#search-close, #search-open').on('click', function(){
  $('#search-fixed').toggleClass('open')
  return false;
});
//меню
if ($(window).width() <= 600) {
$('.main-nav__item--has-child').on('click', function(){
  $(this).toggleClass('open');
  $(this).find('.main-nav__sublist-wrapper').toggleClass('open');
  return false;
})
}
var header = $('.page-header'),
	scrollPrev = 0;

  let menuElem = $('.page-header'), // Элемент который будет прилепать
  menuFixed = 300, // кол-во пикселей от границы, когда меню "прилипнет" к краю экрана.
  menuStatus = false; // Некая оптимизация.



$(window).scroll(function() {
	var scrolled = $(window).scrollTop();
  if ( scrolled > 300 && scrolled < scrollPrev ) {
		header.addClass('fixed').css({'top':'0%'});
	}
  else if( scrolled > scrollPrev ) {
    header.css({'top':'-100%'});
   
  }
  else {
     header.removeAttr('style').removeClass('fixed'); 
  }
	scrollPrev = scrolled;
});;
});
+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    // this.$dialog             = this.$element.find('.modal-dialog')
    this.$dialog             = this.$element.find('.modal__dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    // if (this.options.remote) {
    //   this.$element
    //     // .find('.modal-content')
    //     .find('.modal__content')
    //     .load(this.options.remote, $.proxy(function () {
    //       // this.$element.trigger('loaded.bs.modal')
    //       this.$element.trigger('loaded.nth.modal')
    //     }, this))
    // }
  }

  Modal.VERSION  = '3.3.7'

  // Modal.TRANSITION_DURATION = 300
  // Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    // var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
    var e    = $.Event('show.nth.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    // this.$body.addClass('modal-open')
    this.$body.addClass('js-modal-open')

    this.escape()
    this.resize()

    // this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
    this.$element.on('click.dismiss.nth.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    // this.$dialog.on('mousedown.dismiss.bs.modal', function () {
    this.$dialog.on('mousedown.dismiss.nth.modal', function () {
      // that.$element.one('mouseup.dismiss.bs.modal', function (e) {
      that.$element.one('mouseup.dismiss.nth.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      // var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        // .show()
        .css('display', 'flex')
        .scrollTop(0)

      // that.adjustDialog()

      // if (transition) {
        that.$element[0].offsetWidth // force reflow
      // }

      that.$element.addClass('modal--open')

      that.enforceFocus()

      // var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
      var e = $.Event('shown.nth.modal', { relatedTarget: _relatedTarget })

      // transition ?
      //   that.$dialog // wait for modal to slide in
      //     .one('bsTransitionEnd', function () {
      //       that.$element.trigger('focus').trigger(e)
      //     })
      //     .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    // e = $.Event('hide.bs.modal')
    e = $.Event('hide.nth.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    // $(document).off('focusin.bs.modal')
    $(document).off('focusin.nth.modal')

    this.$element
      .removeClass('modal--open')
      // .off('click.dismiss.bs.modal')
      .off('click.dismiss.nth.modal')
      // .off('mouseup.dismiss.bs.modal')
      .off('mouseup.dismiss.nth.modal')

    // this.$dialog.off('mousedown.dismiss.bs.modal')
    this.$dialog.off('mousedown.dismiss.nth.modal')

    // $.support.transition && this.$element.hasClass('fade') ?
    //   this.$element
    //     .one('bsTransitionEnd', $.proxy(this.hideModal, this))
    //     .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      // .off('focusin.bs.modal') // guard against infinite focus loop
      .off('focusin.nth.modal') // guard against infinite focus loop
      // .on('focusin.bs.modal', $.proxy(function (e) {
      .on('focusin.nth.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      // this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
      this.$element.on('keydown.dismiss.nth.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      // this.$element.off('keydown.dismiss.bs.modal')
      this.$element.off('keydown.dismiss.nth.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      // $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
      $(window).on('resize.nth.modal', $.proxy(this.handleUpdate, this))
    } else {
      // $(window).off('resize.bs.modal')
      $(window).off('resize.nth.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('js-modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      // that.$element.trigger('hidden.bs.modal')
      that.$element.trigger('hidden.nth.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    // var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      // var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        // .addClass('modal-backdrop ' + animate)
        .addClass('modal__backdrop ')
        .appendTo(this.$body)

      // this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
      this.$element.on('click.dismiss.nth.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      // if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      // this.$backdrop.addClass('modal__backdrop--shown')

      if (!callback) return

      // doAnimate ?
      //   this.$backdrop
      //     .one('bsTransitionEnd', callback)
      //     .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('modal--open')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      // $.support.transition && this.$element.hasClass('fade') ?
      //   this.$backdrop
      //     .one('bsTransitionEnd', callbackRemove)
      //     .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  // Modal.prototype.handleUpdate = function () {
  //   this.adjustDialog()
  // }

  // Modal.prototype.adjustDialog = function () {
  //   var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

  //   this.$element.css({
  //     paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
  //     paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
  //   })
  // }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    scrollDiv.style.overflow="scroll"; // nicothin: Отчего-то результатом подсчета всегда был 0 :(
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      // var data    = $this.data('bs.modal')
      var data    = $this.data('nth.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      // if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (!data) $this.data('nth.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  // $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
  $(document).on('click.nth.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    // var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
    var option  = $target.data('nth.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    // $target.one('show.bs.modal', function (showEvent) {
    $target.one('show.nth.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      // $target.one('hidden.bs.modal', function () {
      $target.one('hidden.nth.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}($);
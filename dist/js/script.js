$(document).ready(function(){
    // Carousel
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="image/arrow_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="image/arrow_right.svg"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
    });

    // Slider
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Всплывающий текст в блоке reviews
    const elements = document.querySelectorAll('.hidden'); // выбираем элементы, которые нужно анимировать

    const isInViewport = function(element) { // функция, проверяющая, находится ли элемент в видимой области
        const rect = element.getBoundingClientRect();
            return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const animateElement = function(element) { // функция, отображающая элемент с анимацией
        element.classList.add('visible');
    };

    const handleScroll = function() { // функция, обрабатывающая скролл страницы
        elements.forEach((element) => {
            if (isInViewport(element)) { // если элемент находится в видимой области
                animateElement(element); // отображаем его с анимацией
            }
        });
    };

    window.addEventListener('scroll', handleScroll); // при прокрутке страницы запускаем функцию handleScroll

    // Modal окна
    $('[data-modal="consultation"]').click(() => $('.overlay, #consultation').fadeIn('slow'))
    $('.modal__close').click(() => $('.overlay, #consultation, #order, #thanks').fadeOut('slow'))
    $('.button_catalog').each((i, e) => $(e).click(() => { 
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
        $('.overlay, #order').fadeIn('slow')
    }))

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                  required: "Пожалуйста, введите свое имя",
                  minlength: jQuery.validator.format(" Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою ппочту",
                  email: "Неправильно введен адрес почты, формат адреса: name@domain.com"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // Mask input 
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //  Scroll
    $(window).scroll(() => {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
    });

    $('.pageup').click(() => {
        $('html, body').animate({scrollTop: 0}, 1000);
      });
});
 
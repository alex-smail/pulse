$(document).ready(function(){
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
});

//  напиши код JS для плавно выплыввающего текста снизу вверх при проккрутке сайта  
/* ============================================================
   Site scripts — header/footer injection, active nav link,
   mobile menu, jQuery lightbox, and jQuery contact form flow.
   ============================================================ */

window.addEventListener("load", function () {
    document.getElementById("header").innerHTML = `
        <div class="navBar">
            <div>
                <a href="index.html"><h1>Joao Pedro Luz Rodrigues</h1></a>
            </div>
            <button class="menuButton" aria-label="Menu Button" onclick="toggleMenu(), navMobi(this)">
            <div class="container" onclick="">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                </div>
            </button>
            <ol class="navItems">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="qualifications.html">Qualifications</a></li>
                <li><a href="hobbies.html">Hobbies</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ol>
        </div>`;

    document.getElementById("footer").innerHTML = `
        <div class="footerContent">
            <div class="socialMedias">
                <a href="https://www.instagram.com/jp_rodriguesluz/" aria-label="Instagram">
                    <img class="instaLogo" src="./img/instaLogo.svg" alt="Instagram">
                </a>
                <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-luz-rodrigues-577342240/" aria-label="LinkedIn">
                    <img class="linkedinLogo" src="./img/linkedin-svgrepo-com.svg" alt="LinkedIn">
                </a>
                <a href="mailto:joao.pedro.luz.work@gmail.com" aria-label="Email">
                    <img class="emailLogo" src="./img/emailLogo.svg" alt="Email">
                </a>
            </div>
            <p>Joao Pedro Luz Rodrigues 2026</p>
        </div>`;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navItems a').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

/* Declared as a function so it is a valid global for the inline onclick. */
function toggleMenu(){
    const navItems = document.querySelector('.navItems');
    if (navItems.style.visibility === 'visible') {
        navItems.style.visibility = 'hidden';
    } else {
        navItems.style.visibility = 'visible';
    }
}

function navMobi(x) {
  x.classList.toggle("change");
}

/* --------------------- jQuery features --------------------- */
jQuery(function ($) {

    /* ---- Lightbox: any <img data-lightbox> opens in an overlay ---- */
    var $overlay = $(
        '<div class="lb-overlay" role="dialog" aria-modal="true" aria-label="Image viewer">' +
        '<button class="lb-close" type="button" aria-label="Close image">&times;</button>' +
        '<img class="lb-img" alt="">' +
        '<p class="lb-caption"></p>' +
        '</div>'
    ).appendTo('body');

    function closeLightbox() { $overlay.removeClass('open'); }

    $('img[data-lightbox]').css('cursor', 'zoom-in').on('click', function () {
        var alt = $(this).attr('alt') || '';
        $overlay.find('.lb-img').attr('src', $(this).attr('src')).attr('alt', alt);
        $overlay.find('.lb-caption').text(alt);
        $overlay.addClass('open');
    });

    $overlay.on('click', function (e) {
        if (e.target === this || $(e.target).hasClass('lb-close')) { closeLightbox(); }
    });
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') { closeLightbox(); }
    });

    /* ---- Contact form: validate, then go to confirmation page ---- */
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        var name = $.trim($('#name').val());
        var email = $.trim($('#email').val());
        var message = $.trim($('#message').val());
        var $error = $('#formError');

        if (!name || !email || !message) {
            $error.text('Please fill in every field before sending.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $error.text('Please enter a valid email address.');
            return;
        }
        $error.text('');
        window.location.href = 'confirmation.html?name=' + encodeURIComponent(name);
    });

    /* ---- Confirmation page: greet the visitor by name ---- */
    if (/confirmation\.html$/.test(window.location.pathname)) {
        var params = new URLSearchParams(window.location.search);
        var who = params.get('name');
        if (who) { $('#confirmName').text(', ' + who); }
    }
});
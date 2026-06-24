window.addEventListener("load", function() {
    header.innerHTML = `
        <div class="navBar">
            <div>
                <H1>Joao Pedro Luz Rodrigues</H1>
            </div>
            <button class="menuButton" aria-label="Menu Button" onclick="toggleMenu()"><img src="./img/hamburguerlist.svg" alt="Menu"></button>
            <ol class="navItems">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="qualifications.html">Qualifications</a></li>
                <li><a href="hobbies.html">Hobbies</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ol>
        </div>`;

    footer.innerHTML = `
        <div class="footerContent">
            <div class="socialMedias"> 
                <a href="https://www.instagram.com/jp_rodriguesluz/" aria-label="Instagram">
                    <img class="instaLogo" src="./img/instaLogo.svg" alt="Instagram">
                </a>
                <a href="#" aria-label="LinkedIn">
                    <img class="linkedinLogo" src="./img/linkedin-svgrepo-com.svg" alt="LinkedIn">
                </a>
                <a href="mailto:joao.pedro.luz.work@gmail.com" aria-label="Email">
                    <img class="emailLogo" src="./img/emailLogo.svg" alt="Email">
                </a>
            </div>
            <p>Joao Pedro Luz Rodrigues 2026</p>
        </div>`;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navItems a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

toggleMenu = () => {
    const navItems = document.querySelector('.navItems');
    const menuButton = document.querySelector('.menuButton');
    if (navItems.style.visibility === 'visible') {
        navItems.style.visibility = 'hidden';
    } else {
        navItems.style.visibility = 'visible';
    }
}
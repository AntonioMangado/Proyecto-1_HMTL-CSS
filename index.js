// Variables -------------------------------------------------------------------------------------------------------------
const USER_REGEX = /^.{3,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const burgerMenu = document.querySelector('.nav__burgermenu');
const navLinks = document.querySelector('.nav__links--hidden');
const progressBar = document.querySelector('.header__progressbar');
const toTop = document.querySelector(".to-top");
const contactForm = document.querySelector('.contact__form');
const errorName = document.querySelector('.error-msg.name');
const errorEmail = document.querySelector('.error-msg.email');
const errorConsent = document.querySelector('.error-msg.consent');
const nameLabel = document.querySelector('label[for="name"]');
const nameInput = document.querySelector('input[name="name"]');
const emailLabel = document.querySelector('label[for="email"]');
const emailInput = document.querySelector('input[name="email"]');
const modal = document.querySelector('.modal');
const overlay = document.getElementById('overlay');
const modalClose = document.querySelector('.close-btn');
const newsletterForm = document.querySelector('.modal__form');
const currencyButtons = document.querySelectorAll('.currency__btn');
const pricesBasic = document.querySelector('.pricing__article.basic .price__amount');
const pricesProfessional = document.querySelector('.pricing__article.professional .price__amount');
const pricesPremium = document.querySelector('.pricing__article.premium .price__amount');
const slides = document.querySelectorAll('.slide');
const slideBalls = document.querySelector('.slide__balls');
let slideIndex = 0;
let intervalId = null;

const prices = [0, 25, 60]



// Functions ------------------------------------------------------------------------------------------------------------
function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;
    progressBar.style.width = scrollPercent;
}

function showToTopButton() {
    if (window.scrollY > 100) {
        toTop.classList.add("shown");
    } else {
        toTop.classList.remove("shown");
    }
}

function submitForm(name, email) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({name, email}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function submitNewsletterForm(e) {
    e.preventDefault();
    const email = e.target[1].value;
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function validateAndSubmitForm(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const consent = e.target[2].checked;

    if (!USER_REGEX.test(name)) {
        errorName.innerHTML = 'Please enter a valid name';
        errorName.style.display = 'block';
        nameLabel.style.color = '#ff0033';
        nameInput.style.borderBottom = '2px solid #ff0033';
    } else {
        errorName.style.display = 'none';
        nameLabel.style.color = '#08A6E4';
        nameInput.style.borderBottom = '1px solid black';
    }
    
    if (!EMAIL_REGEX.test(email)) {
        errorEmail.innerHTML = 'Please enter a valid email';
        errorEmail.style.display = 'block';
        emailLabel.style.color = '#ff0033';
        emailInput.style.borderBottom = '2px solid #ff0033';
    } else {
        errorEmail.style.display = 'none';
        emailLabel.style.color = '#08A6E4';
        emailInput.style.borderBottom = '1px solid black';
    }
    
    if (!consent) {
        errorConsent.innerHTML = 'Please accept the terms and conditions';
        errorConsent.style.display = 'block';
    } else {
        errorConsent.style.display = 'none';
    }

    if (USER_REGEX.test(name) && EMAIL_REGEX.test(email) && consent) {
        submitForm(name, email);
    }
}

function showModalbyTime() {
    setTimeout(() => {
        if (localStorage.getItem('modalShown') !== 'true') {
            modal.classList.add('active');
            overlay.classList.add('active');
            localStorage.setItem('modalShown', 'true');
        }
    }, 5000);
}

function showModalbyScroll() {
    if (window.scrollY > 700 && localStorage.getItem('modalShown') !== 'true') {
        modal.classList.add('active');
        overlay.classList.add('active');
        localStorage.setItem('modalShown', 'true');
    }
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function fetchConvertionRate(currency) {
    if (currency === 'eur') {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
            .then(response => response.json())
            .then(data => {
                const conversionRate = data.usd.eur;
                pricesBasic.innerHTML = `€${(prices[0] * conversionRate).toFixed(0)}`;
                pricesProfessional.innerHTML = `€${(prices[1] * conversionRate).toFixed(0)}`;
                pricesPremium.innerHTML = `€${(prices[2] * conversionRate).toFixed(0)}`;
            });
    } else if (currency === 'usd') {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
            .then(response => response.json())
            .then(data => {
                const conversionRate = data.usd.usd;
                pricesBasic.innerHTML = `$${(prices[0] * conversionRate).toFixed(0)}`;
                pricesProfessional.innerHTML = `$${(prices[1] * conversionRate).toFixed(0)}`;
                pricesPremium.innerHTML = `$${(prices[2] * conversionRate).toFixed(0)}`;
            });
    } else if (currency === 'gbp') {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
            .then(response => response.json())
            .then(data => {
                const conversionRate = data.usd.gbp;
                pricesBasic.innerHTML = `£${(prices[0] * conversionRate).toFixed(0)}`;
                pricesProfessional.innerHTML = `£${(prices[1] * conversionRate).toFixed(0)}`;
                pricesPremium.innerHTML = `£${(prices[2] * conversionRate).toFixed(0)}`;
            });
    }
}

function switchCurrency() {
    currencyButtons.forEach(button => {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        }});
    this.classList.add('active');
    const currency = this.classList[1];
    fetchConvertionRate(currency);
}

function initialiseSlider() {
    slides.forEach((slide, index) => {
        slideBalls.innerHTML += `<span class="ball"></span>`;
    });

    slides[slideIndex].classList.add('displaySlide');
    intervalId = setInterval(nextSlide, 5000);
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove('displaySlide');
    })
    document.querySelectorAll('.ball').forEach(ball => {
        ball.classList.remove('active');
    });
    slides[slideIndex].classList.add('displaySlide');
    document.querySelectorAll('.ball')[slideIndex].classList.add('active');
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    clearInterval(intervalId);
    slideIndex++;
    showSlide(slideIndex);
}



// Event Listeners -------------------------------------------------------------------------------------------------------

// Burger Menu
burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Progress Bar
document.addEventListener('scroll', updateProgressBar);

// To top button shows up when scrolling
window.addEventListener("scroll", showToTopButton);

// Show modal after 5 seconds
document.addEventListener('DOMContentLoaded', showModalbyTime);

// Show modal after scrolling 700px
window.addEventListener('scroll', showModalbyScroll);

// Close modal
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Contact Form validation
contactForm.addEventListener('submit', validateAndSubmitForm);

// Newsletter Form submission
newsletterForm.addEventListener('submit', submitNewsletterForm);

// Currency switch
currencyButtons.forEach(button => {
    button.addEventListener('click', switchCurrency);
});

// Initialise slider
document.addEventListener('DOMContentLoaded', initialiseSlider);
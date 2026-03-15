// ===== Mobile Menu Toggle =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Load Technology Content =====
function loadTechnologyContent() {
    const technologyContent = document.getElementById('technology-content');
    
    Object.keys(technologyData).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'technology__category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'technology__category-title';
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryDiv.appendChild(categoryTitle);
        
        const grid = document.createElement('div');
        grid.className = 'technology__grid';
        
        technologyData[category].forEach((tech, index) => {
            const techItem = document.createElement('div');
            techItem.className = 'technology__item';
            techItem.style.animationDelay = `${index * 0.1}s`;
            
            const techName = document.createElement('div');
            techName.className = 'technology__item-name';
            techName.textContent = tech.name;
            
            techItem.appendChild(techName);
            grid.appendChild(techItem);
        });
        
        categoryDiv.appendChild(grid);
        technologyContent.appendChild(categoryDiv);
    });
}

// ===== Load Books Content =====
function loadBooksContent() {
    const booksContent = document.getElementById('books-content');
    
    booksData.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.style.animationDelay = `${index * 0.1}s`;
        
        const cover = document.createElement('img');
        cover.className = 'book-card__cover';
        cover.src = book.cover;
        cover.alt = `${book.title} cover`;
        cover.onerror = function() {
            this.style.display = 'none';
        };
        
        const content = document.createElement('div');
        content.className = 'book-card__content';
        
        const title = document.createElement('h3');
        title.className = 'book-card__title';
        title.textContent = book.title;
        
        const author = document.createElement('p');
        author.className = 'book-card__author';
        author.textContent = `by ${book.author}`;
        
        const rating = document.createElement('div');
        rating.className = 'book-card__rating';
        rating.textContent = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
        
        const review = document.createElement('p');
        review.className = 'book-card__review';
        review.textContent = book.review;
        
        const date = document.createElement('p');
        date.className = 'book-card__date';
        date.textContent = book.dateRead;
        
        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(rating);
        content.appendChild(review);
        content.appendChild(date);
        
        bookCard.appendChild(cover);
        bookCard.appendChild(content);
        booksContent.appendChild(bookCard);
    });
}

// ===== Slider Functionality =====
let currentSlide = 0;
let sliderInterval = null;

function initSlider() {
    const sliderContainer = document.getElementById('slider-container');
    const dotsContainer = document.getElementById('slider-dots');
    
    // Create slides
    sliderData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slider__slide';
        if (index === 0) slideElement.classList.add('active');
        
        if (slide.image) {
            const image = document.createElement('img');
            image.className = 'slider__slide-image';
            image.src = slide.image;
            image.alt = slide.title;
            image.onerror = function() {
                // If image fails, show content instead
                this.style.display = 'none';
                const content = createSlideContent(slide);
                slideElement.appendChild(content);
            };
            slideElement.appendChild(image);
            // Add content overlay on top of image
            const content = createSlideContent(slide);
            content.classList.add('slider__slide-content--overlay');
            slideElement.appendChild(content);
        } else {
            const content = createSlideContent(slide);
            slideElement.appendChild(content);
        }
        
        sliderContainer.appendChild(slideElement);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = 'slider__dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set up navigation buttons
    const prevButton = document.getElementById('slider-prev');
    const nextButton = document.getElementById('slider-next');
    
    prevButton.addEventListener('click', () => previousSlide());
    nextButton.addEventListener('click', () => nextSlide());
    
    // Auto-play slider
    startAutoPlay();
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
}

function createSlideContent(slide) {
    const content = document.createElement('div');
    content.className = 'slider__slide-content';
    
    // Only add title if it exists
    if (slide.title) {
        const title = document.createElement('h2');
        title.className = 'slider__slide-title';
        title.textContent = slide.title;
        content.appendChild(title);
    }
    
    // Only add description if it exists
    if (slide.description) {
        const description = document.createElement('p');
        description.className = 'slider__slide-description';
        description.textContent = slide.description;
        content.appendChild(description);
    }
    
    // Add link if it exists
    if (slide.link && slide.linkText) {
        const link = document.createElement('a');
        link.className = 'slider__slide-link';
        link.href = slide.link;
        link.textContent = slide.linkText;
        content.appendChild(link);
    }
    
    return content;
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slider__slide');
    const dots = document.querySelectorAll('.slider__dot');
    
    if (index < 0 || index >= slides.length) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = index;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reset auto-play
    stopAutoPlay();
    startAutoPlay();
}

function nextSlide() {
    const slides = document.querySelectorAll('.slider__slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function previousSlide() {
    const slides = document.querySelectorAll('.slider__slide');
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
}

function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    sliderInterval = setInterval(() => {
        nextSlide();
    }, 15000); // Change slide every 15 seconds
}

function stopAutoPlay() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
    }
}

// ===== Load Travel Content =====
function loadTravelContent() {
    const travelContent = document.getElementById('travel-content');
    
    travelData.forEach((trip, index) => {
        const travelCard = document.createElement('div');
        travelCard.className = 'travel-card';
        travelCard.style.animationDelay = `${index * 0.1}s`;
        
        const image = document.createElement('img');
        image.className = 'travel-card__image';
        image.src = trip.image;
        image.alt = trip.location;
        image.onerror = function() {
            this.style.display = 'none';
        };
        
        const content = document.createElement('div');
        content.className = 'travel-card__content';
        
        const location = document.createElement('h3');
        location.className = 'travel-card__location';
        location.textContent = trip.location;
        
        const date = document.createElement('p');
        date.className = 'travel-card__date';
        date.textContent = trip.date;
        
        const description = document.createElement('p');
        description.className = 'travel-card__description';
        description.textContent = trip.description;
        
        const highlights = document.createElement('ul');
        highlights.className = 'travel-card__highlights';
        trip.highlights.forEach(highlight => {
            const li = document.createElement('li');
            li.textContent = highlight;
            highlights.appendChild(li);
        });
        
        content.appendChild(location);
        content.appendChild(date);
        content.appendChild(description);
        content.appendChild(highlights);
        
        travelCard.appendChild(image);
        travelCard.appendChild(content);
        travelContent.appendChild(travelCard);
    });
}

// ===== Scroll Animation Observer =====
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== Header Scroll Effect =====
function headerScroll() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', headerScroll);

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    loadTechnologyContent();
    loadBooksContent();
    loadTravelContent();
    observeElements();
    headerScroll();
});


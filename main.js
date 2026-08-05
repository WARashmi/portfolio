// Typed.js Animation
var typed = new Typed(".text", {
    strings: ["Frontend Developer", "UI/UX Designer", "QA Tester"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function () {
        const isOpen = navbar.classList.toggle('open');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navbar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navbar.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// PROJECT FILTERING SYSTEM


const filterButtons = document.querySelectorAll('.filter-btn');
const projectRows = document.querySelectorAll('.portfolio .row');

// Filter from service cards click
const serviceLinks = document.querySelectorAll('.service-list .read');
serviceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const filterValue = this.getAttribute('data-filter');
        if (filterValue) {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === filterValue) {
                    btn.classList.add('active');
                }
            });
            // Apply filter
            filterProjects(filterValue);
        }
    });
});

// Filter from filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

function filterProjects(filterValue) {
    projectRows.forEach(row => {
        row.classList.remove('show');
        row.classList.add('hide');

        if (filterValue === 'all') {
            row.classList.remove('hide');
            row.classList.add('show');
        } else {
            const category = row.getAttribute('data-category');
            if (category === filterValue) {
                row.classList.remove('hide');
                row.classList.add('show');
            }
        }
    });
}

// Initialize - show all projects
filterProjects('all');


// SCROLL REVEAL ANIMATION


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('.service-list div, .bar, .circle, .row').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});


// SKILL BARS ANIMATION


const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('.progress-line span');
            spans.forEach(span => {
                span.style.width = span.parentElement.classList.contains('html') ? '95%' :
                                   span.parentElement.classList.contains('js') ? '85%' :
                                   span.parentElement.classList.contains('java') ? '80%' :
                                   span.parentElement.classList.contains('python') ? '75%' :
                                   span.parentElement.classList.contains('react') ? '75%' :
                                   span.parentElement.classList.contains('figma') ? '90%' : '0%';
                span.style.transition = 'width 1.5s ease';
            });
        }
    });
}, { threshold: 0.3 });

const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) {
    skillObserver.observe(skillsContainer);
}


// CIRCLES ANIMATION (Professional Skills)


const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const outer = entry.target.querySelector('.outer');
            if (outer) {
                const percent = outer.getAttribute('data-percent');
                const deg = (percent / 100) * 360;
                outer.style.background = `conic-gradient(lightseagreen 0 ${deg}deg, #1f3d5b ${deg}deg)`;
                outer.style.transition = 'background 1.5s ease';
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.circle').forEach(circle => {
    circleObserver.observe(circle);
});


// SMOOTH SCROLL FOR ANCHOR LINKS


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


// BACK TO TOP BUTTON VISIBILITY


const topButton = document.querySelector('.top');
if (topButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            topButton.style.opacity = '1';
            topButton.style.visibility = 'visible';
        } else {
            topButton.style.opacity = '0';
            topButton.style.visibility = 'hidden';
        }
    });
    topButton.style.transition = 'all 0.3s ease';
    topButton.style.opacity = '0';
    topButton.style.visibility = 'hidden';
}
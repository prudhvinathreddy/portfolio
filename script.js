// Header scroll effect
window.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	header.classList.toggle('scrolled', window.scrollY > 0);
	});
	
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
	const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', !isExpanded);
	nav.classList.toggle('active');
	});
	
// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
	if (!e.target.closest('nav') && nav.classList.contains('active')) {
		nav.classList.remove('active');
		menuToggle.setAttribute('aria-expanded', 'false');
		}
		});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth'
				});
				// Close mobile menu if open
				nav.classList.remove('active');
				menuToggle.setAttribute('aria-expanded', 'false');
				}
				});
				});

        // Lightbox functionality
        function openLightbox(imgElement) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightbox.style.display = 'flex';
            lightboxImg.src = imgElement.src;
            lightboxImg.alt = imgElement.alt;
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close lightbox on outside click
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') {
                closeLightbox();
            }
        });

        // Image lazy loading with Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.gallery img').forEach(img => {
            imageObserver.observe(img);
        });

        // Form submission handler
		function handleSubmit(event) {
            event.preventDefault(); // Prevent the default form submission

            // Create a FormData object to send the form data to Formspree
            const formData = new FormData(event.target);

            fetch(event.target.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log(response); // Log the response to the console for debugging

                if (response.ok) {
                    // Show the success popup if status is 200 OK
                    showPopup();
                } else {
                    return response.json().then(data => {
                        // Display the error message if there's a problem
                        alert(`Error: ${data.error || 'There was a problem with the form submission.'}`);
                    });
                }
            })
            .catch(error => {
                // Log the error to the console and display an alert
                console.error(error);
                alert('There was a problem with the form submission. Please try again.');
            });
        }

        function showPopup() {
            document.getElementById('popup').style.display = 'block';
        }

        function closePopup() {
            document.getElementById('popup').style.display = 'none';
        }
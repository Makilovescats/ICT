const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = Array.from(document.querySelectorAll("main section"));

const toggleNavigation = () => {
	const expanded = navToggle.getAttribute("aria-expanded") === "true";
	navToggle.setAttribute("aria-expanded", String(!expanded));
	navLinks.classList.toggle("is-open", !expanded);
};

if (navToggle) {
	navToggle.addEventListener("click", toggleNavigation);
}

navAnchors.forEach((anchor) => {
	anchor.addEventListener("click", () => {
		if (navToggle) {
			navToggle.setAttribute("aria-expanded", "false");
		}
		navLinks.classList.remove("is-open");
	});
});

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.2,
	},
);

document.querySelectorAll("[data-animate]").forEach((element) => {
	observer.observe(element);
});

const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			}

			navAnchors.forEach((anchor) => anchor.classList.remove("is-active"));
			const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
			if (activeLink) {
				activeLink.classList.add("is-active");
			}
		});
	},
	{
		rootMargin: "-45% 0px -45% 0px",
	},
);

sections.forEach((section) => sectionObserver.observe(section));

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
	backToTop.addEventListener("click", (event) => {
		event.preventDefault();
		const target = document.querySelector(backToTop.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
			});
		}
	});
}

window.addEventListener("scroll", () => {
	const scrolled = window.scrollY > 120;
	document.body.classList.toggle("scrolled", scrolled);
});

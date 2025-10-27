
  window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
  });


// Small, accessible hamburger toggle for the site navigation
(function () {
  "use strict";

  // DOM helpers
  function $(sel, root = document) {
    return root.querySelector(sel);
  }
  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nav = $(".site-nav");
    var toggle = $(".nav-toggle");
    var menu = $("#primary-menu");

    if (!nav || !toggle || !menu) return;

    // Toggle function
    function setOpen(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function (e) {
      var isOpen = nav.classList.contains("open");
      setOpen(!isOpen);
    });

    // Close when a nav link is clicked (mobile)
    $all(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        // small delay to allow anchor navigation
        setOpen(false);
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    // Click outside to close (mobile)
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target)) return;
      setOpen(false);
    });

    // Add a class if hero is present under the nav to allow visual tweak
    var hero = document.querySelector(".hero");
    if (hero) {
      // if hero is visible at top, add hero-over so nav can be semi-transparent
      var heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom > 56) nav.classList.add("hero-over");

      // watch scroll and toggle
      var onScroll = function () {
        var hb = hero.getBoundingClientRect().bottom;
        nav.classList.toggle("hero-over", hb > 56);
      };
      window.addEventListener("scroll", throttle(onScroll, 150));
    }

    // Simple throttle
    function throttle(fn, wait) {
      var last = 0;
      var t;
      return function () {
        var now = Date.now();
        var args = arguments;
        if (now - last >= wait) {
          last = now;
          fn.apply(this, args);
        } else {
          clearTimeout(t);
          t = setTimeout(function () {
            last = Date.now();
            fn.apply(this, args);
          }, wait - (now - last));
        }
      };
    }
  });
})();


// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
  const OFFSET = 70; // Offset for fixed header
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - OFFSET;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }   
        });
    });
}   ); 
// Initialize AOS (Animate On Scroll) library



function nobackend(){
  alert("This feature is not available in the demo version of the site.");
}
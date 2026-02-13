import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    const hiddenElements = document.querySelectorAll('.opacity-0-start');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }); // Run on every render to catch new elements
};

export default useScrollAnimation;
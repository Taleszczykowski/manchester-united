(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.count), start = performance.now(), duration = 900;
    const frame = now => {
      const progress = Math.min((now - start) / duration, 1), eased = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = new Intl.NumberFormat('en-US').format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame); countObserver.unobserve(entry.target);
  }), { threshold: 0.7 });
  document.querySelectorAll('[data-count]').forEach(element => countObserver.observe(element));
})();

document.addEventListener('DOMContentLoaded', async () => {
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  try {
    const data = await window.SV.loadContent();
    document.querySelector('[data-topic-list]').innerHTML =
      data.topics.map(topic => `<a class="topic-chip" href="#trending">${window.SV.escape(topic)}</a>`).join('');

    document.querySelector('[data-carousel="trending"]').innerHTML =
      data.trending.map(item => window.SVRender.card(item)).join('');

    document.querySelector('[data-grid="latest"]').innerHTML =
      data.latest.map(item => window.SVRender.card(item, true)).join('');

    document.querySelector('[data-grid="shorts"]').innerHTML =
      data.shorts.map(item => `<article class="short-card"><span>${window.SV.escape(item)}</span></article>`).join('');

    document.querySelector('[data-grid="podcasts"]').innerHTML =
      data.podcasts.map(item => window.SVRender.podcast(item)).join('');
  } catch (error) {
    console.error(error);
  }

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  updateHeader();
  window.addEventListener('scroll', updateHeader, {passive:true});

  const dialog = document.querySelector('[data-search-dialog]');
  document.querySelector('[data-search-open]')?.addEventListener('click', () => dialog?.showModal());

  const searchInput = document.querySelector('#site-search');
  const results = document.querySelector('[data-search-results]');
  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim();
    results.textContent = query ? `Searching Slanted View for “${query}”…` : '';
  });

  document.querySelector('[data-join-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.querySelector('[data-form-status]');
    status.textContent = 'You’re on the list. Welcome to the movement.';
    event.currentTarget.reset();
  });
});
document.addEventListener('DOMContentLoaded',()=>{const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>o.observe(el));});

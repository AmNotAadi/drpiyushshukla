document.addEventListener('DOMContentLoaded',()=>{
  // Prevent auto-jump on reload (browser restores to anchor/hash)
  if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; }
  if(location.hash){
    window.scrollTo(0,0);
    setTimeout(()=>history.replaceState(null,'',location.pathname+location.search),0);
  }

  const yearEl=document.getElementById('year');
  if(yearEl){ yearEl.textContent=new Date().getFullYear(); }

  // Smooth scroll offset for sticky header
  const header=document.querySelector('.site-header');
  const links=[...document.querySelectorAll('a[href^="#"]')];
  links.forEach(link=>{
    link.addEventListener('click',e=>{
      const id=link.getAttribute('href');
      if(!id || id==='#') return;
      const target=document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      const headerH=header?header.offsetHeight:0;
      const top=target.getBoundingClientRect().top+window.scrollY-headerH-8;
      window.scrollTo({top,behavior:'smooth'});
    });
  });

  // Dropdown accessibility
  const menu=document.querySelector('.menu');
  const menuBtn=document.querySelector('.menu-btn');
  if(menu && menuBtn){
    const setOpen=(open)=>{
      if(open){ menu.classList.add('open'); menuBtn.setAttribute('aria-expanded','true'); }
      else{ menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }
    };
    menuBtn.addEventListener('click',()=>{
      setOpen(!menu.classList.contains('open'));
    });
    document.addEventListener('click',(e)=>{
      if(!menu.contains(e.target)){ setOpen(false); }
    });
    document.addEventListener('keydown',(e)=>{
      if(e.key==='Escape'){ setOpen(false); }
    });
  }

  // Scroll reveal
  const revealEls=[...document.querySelectorAll('.reveal')];
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // animate bars inside skills
        entry.target.querySelectorAll('.bar').forEach(bar=>{
          const pct=bar.getAttribute('data-pct');
          const fill=bar.querySelector('span');
          if(fill && pct){ fill.style.width=pct+'%'; }
        });
      }
    });
  },{threshold:.15});
  revealEls.forEach(el=>io.observe(el));

  // Back to top
  const toTop=document.querySelector('.to-top');
  const toggleToTop=()=>{
    if(window.scrollY>400){ toTop&&toTop.classList.add('show'); }
    else { toTop&&toTop.classList.remove('show'); }
  };
  window.addEventListener('scroll',toggleToTop,{passive:true});
  toTop&&toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Research tabs
  const tabs=[...document.querySelectorAll('.tabs .tab')];
  const panels=[...document.querySelectorAll('.tab-panel')];
  if(tabs.length){
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        const control=tab.getAttribute('aria-controls');
        tabs.forEach(t=>{t.classList.remove('active'); t.setAttribute('aria-selected','false');});
        panels.forEach(p=>p.id===control? (p.hidden=false) : (p.hidden=true));
        tab.classList.add('active');
        tab.setAttribute('aria-selected','true');
        const y=tab.getBoundingClientRect().top + window.scrollY - (header?header.offsetHeight:0) - 8;
        if(window.matchMedia('(max-width: 600px)').matches){ window.scrollTo({top:y, behavior:'smooth'}); }
      });
    });
  }

  // CV links handled via native download attribute in HTML

  // Dark Mode Toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply theme to body
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    document.body.classList.remove('dark-mode');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
  
  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Add wave overlay
      const wave = document.createElement('div');
      wave.className = 'theme-wave';
      document.body.appendChild(wave);
      
      // Start wave animation
      setTimeout(() => {
        wave.classList.add('active');
      }, 10);
      
      // Change theme when wave is halfway through
      setTimeout(() => {
        // Apply theme to body
        if (newTheme === 'dark') {
          document.body.classList.add('dark-mode');
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        } else {
          document.body.classList.remove('dark-mode');
          moonIcon.style.display = 'none';
          sunIcon.style.display = 'block';
        }
        localStorage.setItem('theme', newTheme);
      }, 300);
      
      // Remove wave after animation completes
      setTimeout(() => {
        wave.classList.remove('active');
        setTimeout(() => {
          if (document.body.contains(wave)) {
            document.body.removeChild(wave);
          }
        }, 600);
      }, 600);
      
      // Add click animation to button
      themeToggle.style.transform = 'scale(0.95)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 100);
    });
  }

  // Expandable Awards functionality
  const awardItems = [...document.querySelectorAll('.award-item')];
  awardItems.forEach(item => {
    const header = item.querySelector('.award-header');
    const toggle = item.querySelector('.award-toggle');
    
    header.addEventListener('click', () => {
      const isExpanded = item.classList.contains('expanded');
      
      // Close all other awards
      awardItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('expanded');
        }
      });
      
      // Toggle current award
      if (isExpanded) {
        item.classList.remove('expanded');
      } else {
        item.classList.add('expanded');
      }
    });
  });

  // Basic client-side validation message
  const form=document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const name=data.get('name');
      const email=data.get('email');
      const message=data.get('message');
      if(!name||!email||!message){
        alert('Please fill in all fields.');
        return;
      }
      alert('Thanks! Your message form is a placeholder; we will wire it up.');
      form.reset();
    });
  }
});



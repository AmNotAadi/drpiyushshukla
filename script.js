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
      });
    });
  }

  // CV links handled via native download attribute in HTML

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



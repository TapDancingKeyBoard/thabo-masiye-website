// MentorLink site behaviour
(function(){
  // mobile menu
  var toggle=document.querySelector('.menu-toggle'), menu=document.getElementById('site-menu');
  if(toggle&&menu){
    toggle.addEventListener('click',function(){
      var open=menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open);
      toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')})});
  }

  // reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
    els.forEach(function(el){io.observe(el)});
  } else { els.forEach(function(el){el.classList.add('in')}); }

  // enquiry form: preselect topic from ?service= or ?type=, demo submit
  var form=document.getElementById('enquiry');
  if(form){
    var q=new URLSearchParams(location.search), pick=q.get('service')||q.get('type'), sel=document.getElementById('topic');
    if(pick&&sel&&sel.querySelector('option[value="'+pick+'"]')) sel.value=pick;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return;}
      // TODO before launch: send to MentorLink's inbox (e.g. Formspree or a mail handler)
      document.getElementById('formBody').style.display='none';
      document.getElementById('success').style.display='block';
    });
  }
})();

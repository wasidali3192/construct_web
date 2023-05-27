const togglebtn=document.getElementsByClassName('toggle-btn')[0];   
      const navlinks=document.getElementsByClassName('nav-links')[0];
 
      togglebtn.addEventListener('click', (e)=>{
        e.preventDefault();
       navlinks.classList.toggle('active');
      })
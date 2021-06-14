function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("navbut").style.marginRight ="250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight= "-250px";
    document.getElementById("navbut").style.marginRight= "0";
  }


// Bearbeitung darf erst starten, wenn der Browser alle Daten geleaden hat 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

  // Formel in Element boo schreiben  
  katex.render("c = \\pm\\sqrt{a^2 + b^2}", boo, {
      throwOnError: false
  });

  // alle Textknoten ab boo2 werden gerendert
  window.renderMathInElement(boo2, {delimiters: [
    					{left: "$$", right: "$$", display: true},
					  {left: "$", right: "$", display: false}
            ]});
});

    // Service Worker registrieren für PWA
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('scripts/sw.js')
				.then(reg => console.log(reg))
				.catch(err => console.log(err));
    }
    

    // Bearbeitung darf erst starten, wenn der Browser alle Daten geleaden hat 
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

// Formel in Element boo schreiben  
katex.render("c = \\pm\\sqrt[3]{a^2 + b^2}", boo, {
    throwOnError: false
});

katex.render("c =e^{\\frac{a}{b}}", boo3, {
  throwOnError: false
});

// alle Textknoten ab boo2 werden gerendert
window.renderMathInElement(boo2, {delimiters: [
            {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
          ]} );

});
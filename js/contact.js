(function () {
  var addr = 'hello' + '@' + 'websitesamerica.com';
  var el = document.getElementById('email-link');
  if (el) {
    el.textContent = addr;
    el.href = 'mailto:' + addr;
  }

  var tierParam = new URLSearchParams(window.location.search).get('tier');
  var sel = document.getElementById('tier');
  if (tierParam && sel) {
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === tierParam) { sel.value = tierParam; break; }
    }
  }

  var form = document.getElementById('quote-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.innerHTML = '<div style="text-align:center; padding:30px 10px;">' +
            '<div style="font-size:2.5rem; margin-bottom:12px;">✅</div>' +
            '<h3 style="margin-bottom:8px;">Request sent!</h3>' +
            '<p style="color:var(--muted);">Thanks for reaching out — we\'ll get back to you within one business day.</p>' +
            '</div>';
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Send My Request →';
        alert('Something went wrong sending your request. Please email us directly at ' + addr);
      });
  });
})();

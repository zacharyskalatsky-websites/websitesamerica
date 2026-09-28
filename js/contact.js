(function () {
  var tierParam = new URLSearchParams(window.location.search).get('tier');
  var sel = document.getElementById('tier');
  if (tierParam && sel) {
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === tierParam) { sel.value = tierParam; break; }
    }
  }

  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  function say(msg) { if (status) status.textContent = msg; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    say('');
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.innerHTML = '<div style="text-align:center; padding:30px 10px 0;">' +
            '<div style="font-size:2.5rem; margin-bottom:12px;">✅</div>' +
            '<h3 style="margin-bottom:8px;">Request sent!</h3>' +
            '</div>';
          say('Thanks for reaching out — we\'ll get back to you within one business day.');
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Send My Request →';
        say('Something went wrong sending your request. Please try again in a moment.');
      });
  });
})();

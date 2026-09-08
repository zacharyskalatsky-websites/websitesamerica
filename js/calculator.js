(function () {
  function calc() {
    var isNew = document.getElementById('c-start').value === 'new';
    var seo = document.getElementById('c-seo').value === 'yes';

    var label, price, monthly, note, tier;
    if (isNew) {
      var upfront = 10000 + 2000;
      label = seo ? 'Foundation + Growth' : 'Foundation + first-year reserve';
      price = '$' + upfront.toLocaleString();
      monthly = seo ? '+ $2,500/mo Growth (3-month initial commitment)' : 'No monthly growth selected — you can add it any time';
      note = seo
        ? '$10,000 build ($5,000 on approval, $5,000 at launch) + $2,000 infrastructure reserve. Live in about 7 days, then we grow your visibility every month. U.S. veterans: 15% off everything.'
        : '$10,000 build ($5,000 on approval, $5,000 at launch) + $2,000 infrastructure reserve. Live in about 7 days. U.S. veterans: 15% off everything.';
      tier = seo ? 'Growth' : 'Foundation';
    } else {
      label = 'Growth — SEO & Digital Growth';
      price = '$2,500/mo';
      monthly = '5 original SEO articles/month + monitoring, optimization & reporting';
      note = 'Three-month initial commitment, then month-to-month with 30 days\' notice. We start with a review of your existing site and search data. U.S. veterans: 15% off everything.';
      tier = 'Growth';
    }

    document.getElementById('r-tier').textContent = label;
    document.getElementById('r-price').textContent = price;
    document.getElementById('r-monthly').textContent = monthly;
    document.getElementById('r-note').textContent = note;
    document.getElementById('r-cta').href = '/contact?tier=' + encodeURIComponent(tier);
    var result = document.getElementById('calc-result');
    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  var form = document.getElementById('calc');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });
  var btn = document.getElementById('calc-btn');
  if (btn) btn.addEventListener('click', calc);
})();

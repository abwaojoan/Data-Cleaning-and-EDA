// Interactive features for Data Cleaning & EDA Tutorial

document.addEventListener('DOMContentLoaded', () => {
  // Copy code buttons
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent;
      navigator.clipboard.writeText(code.trim()).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
      });
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

  // Checklist progress
  const checklists = document.querySelectorAll('.checklist');
  checklists.forEach(list => {
    const boxes = list.querySelectorAll('input[type="checkbox"]');
    const wrap = list.previousElementSibling?.classList.contains('progress-wrap')
      ? list.previousElementSibling
      : null;
    const fill = wrap?.querySelector('.progress-fill');
    const label = wrap?.querySelector('.progress-label');

    function update() {
      const total = boxes.length;
      const done = [...boxes].filter(b => b.checked).length;
      const pct = total ? Math.round((done / total) * 100) : 0;
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = `${done} of ${total} completed (${pct}%)`;
      // Persist
      boxes.forEach((b, i) => {
        localStorage.setItem('checklist-' + list.dataset.id + '-' + i, b.checked);
      });
    }

    boxes.forEach((b, i) => {
      const key = 'checklist-' + (list.dataset.id || 'default') + '-' + i;
      if (localStorage.getItem(key) === 'true') b.checked = true;
      b.addEventListener('change', update);
    });
    update();
  });

  // Highlight active nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.endsWith(path) || (path === '' && href.includes('index'))) {
      a.classList.add('active');
    }
  });
});

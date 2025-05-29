import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const url = config['json-url'];

  if (!url) {
    block.innerHTML = '<p>No "json-url" provided in block config.</p>';
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed');

    const data = await response.json();

    const ul = document.createElement('ul');
    ul.className = 'product-list-items';

    data.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'product-item';
      li.innerHTML = `
        <a href="${item.path}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <strong>${item.price}</strong>
        </a>
      `;
      ul.appendChild(li);
    });

    block.textContent = '';
    block.appendChild(ul);
  } catch (e) {
    block.innerHTML = `<p>Error loading product list: ${e.message}</p>`;
  }
}

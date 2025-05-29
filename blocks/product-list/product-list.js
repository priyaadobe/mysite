import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const url = config['json-url'];

  if (!url) {
    block.innerHTML = '<p>No "json-url" provided in block config.</p>';
    return;
  }

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to load data');
    const data = await resp.json();

    const ul = document.createElement('ul');
    ul.classList.add('product-list');

    data.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${item.path}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <strong>${item.price}</strong>
        </a>
      `;
      ul.appendChild(li);
    });

    block.innerHTML = ''; // Clear table
    block.appendChild(ul);
  } catch (err) {
    block.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

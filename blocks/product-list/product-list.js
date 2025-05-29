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
    if (!resp.ok) throw new Error(`Failed to load data: ${resp.status}`);
    const json = await resp.json();

    const data = json.data;
    if (!Array.isArray(data)) throw new Error('Expected data to be an array');

    // Create table
    const table = document.createElement('table');
    table.classList.add('product-table');

    // Create header row
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Link</th>
      </tr>
    `;
    table.appendChild(thead);

    // Create body rows
    const tbody = document.createElement('tbody');
    data.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>$${item.price}</td>
        <td><a href="${item.path}">View</a></td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    block.innerHTML = ''; // Clear existing content
    block.appendChild(table);
  } catch (err) {
    block.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

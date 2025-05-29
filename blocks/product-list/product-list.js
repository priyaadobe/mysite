import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const url = config['json-url'];
  const pageSize = 20;
  let currentPage = 1;

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

    function renderTable(page) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedData = data.slice(start, end);

      const table = document.createElement('table');
      table.classList.add('product-table');
      table.innerHTML = `
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          ${paginatedData
            .map(
              (item) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.description}</td>
              <td>$${item.price}</td>
              <td><a href="${item.path}">View</a></td>
            </tr>`
            )
            .join('')}
        </tbody>
      `;
      return table;
    }

    function renderPagination() {
      const totalPages = Math.ceil(data.length / pageSize);
      const pagination = document.createElement('div');
      pagination.classList.add('pagination');

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
          currentPage = i;
          render();
        });
        pagination.appendChild(btn);
      }
      return pagination;
    }

    function render() {
      block.innerHTML = '';
      block.appendChild(renderTable(currentPage));
      block.appendChild(renderPagination());
    }

    render();
  } catch (err) {
    block.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

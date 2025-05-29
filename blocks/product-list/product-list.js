export default async function decorate(block) {
  // Extract config table (first row, first cell)
  const url = block.querySelector('a')?.href 
           || block.querySelector('td')?.textContent?.trim();

  if (!url) {
    block.innerHTML = '<p>No JSON URL provided in block config.</p>';
    return;
  }

  const response = await fetch(url);

  if (!response.ok) {
    block.innerHTML = '<p>Error loading product list.</p>';
    return;
  }

  const data = await response.json();
  const ul = document.createElement('ul');
  ul.classList.add('product-list-items');

  data.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('product-item');

    li.innerHTML = `
      <a href="${item.path}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <strong>${item.price}</strong>
      </a>
    `;

    ul.appendChild(li);
  });

  block.innerHTML = ''; // Clear config table
  block.appendChild(ul);
}

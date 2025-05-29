export default async function decorate(block) {
  const response = await fetch('https://main--mysite--priyaadobe.aem.page/shared-products.json');

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

  block.appendChild(ul);
}

export default function decorate(block) {
    const img = block.querySelector('img');
    const title = block.querySelector('strong');
    const description = block.querySelector('p');
    const link = block.querySelector('a');
    block.classList.add('banner');
    const content = document.createElement('div');
    content.className = 'banner-content';
    if (title) content.appendChild(Object.assign(document.createElement('h2'), { innerHTML: title.innerHTML }));
    if (description) content.appendChild(Object.assign(document.createElement('p'), { innerHTML: description.innerHTML }));
    if (link) content.appendChild(link);
    block.innerHTML = '';
    if (img) block.appendChild(img);
    block.appendChild(content);
  }
 
export function readBlockConfig(block) {
  const config = {};
  [...block.querySelectorAll('div')].forEach((row) => {
    if (row.children.length === 2) {
      const key = row.children[0].textContent.trim().toLowerCase();
      const value = row.children[1].textContent.trim();
      config[key] = value;
    }
  });
  return config;
}

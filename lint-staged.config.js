module.exports = {
  '*.{js,ts,jsx,tsx}': (files) => `eslint --max-warnings=0 --fix ${files.join(' ')}`,
  '*.{ts,tsx}': (_) => 'tsc --noEmit',
};

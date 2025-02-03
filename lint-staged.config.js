export default {
  '*.{js,ts,jsx,tsx}': (files) => `eslint --max-warnings=0 --fix ${files.join(' ')}`,
  '*.{ts,tsx}': () => 'tsc --noEmit',
};

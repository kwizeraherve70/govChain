import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss('./src/frontend/tailwind.config.js'),  // Path to tailwind config
    autoprefixer,
  ],
};
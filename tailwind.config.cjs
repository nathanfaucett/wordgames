/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '320px',
			md: '640px',
			lg: '968px',
			xl: '1440px'
		}
	},
	plugins: []
};

module.exports = config;

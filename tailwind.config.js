module.exports = {
    purge: ['./src/**/*.{vue,js,ts,jsx,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'primary': 'rgb(89 87 193 / 1)',
                'secondary': '#ffed4a',
                'danger': '#e3342f',
                'dark-font-color': '#030303',
                'background-color': '#edf2f8'

            },
            fontFamily: {
                'sans': ['Roboto', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
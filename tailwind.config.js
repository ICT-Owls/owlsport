module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            primary: '#f5f5f5',
            secondary: '#ec1e24',
            background: '#e0e0e0',
        },
        extend: {},
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        },
    ],
};
('');

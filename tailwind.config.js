module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    200: '#ec1e24',
                    100: '#ef4b4f',
                    300: '#a51519',
                },
                secondary: {
                    200: '#666666',
                    100: '#848484',
                    300: '#474747',
                },
                background: {
                    200: '#e0e0e0',
                    100: '#ffffff',
                },
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        },
    ],
};
('');

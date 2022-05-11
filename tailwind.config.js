module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    important: '#root',
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
                    200: '#e8eaec',
                    100: '#ffffff',
                },
            },
            backgroundImage: theme => ({
                'background': "url('../background.png')",
            }),

        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        },
        require('tailwind-scrollbar'),
    ],
};
('');

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
                sideandmain: {
                    100: '	rgba(255, 255, 255, 0.8)',
                    200: '	rgba(255, 255, 255, 0.9)',
                },
            },
            backgroundImage: (theme) => ({
                background: "url('../background.png')",
            }),
            transitionDuration: {
                opacity: 1000,
            },
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

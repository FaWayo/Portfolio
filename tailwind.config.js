module.exports = {
    content: [
        './src/*.html',
        './src/**/*.{html,js}'
    ],
    theme: {
        extend: {
            animation: {
                'drop-in': 'dropIn 0.6s ease-out forwards',
            },
            keyframes: {
                dropIn: {
                    '0%': {
                        transform: 'translateY(-100px)', // Start above the screen
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)', // End at the original position
                        opacity: '1',
                    },
                },
            },
        },
        variants: {
            extend: {},
        },
        plugins: [],
    }
}
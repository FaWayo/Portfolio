module.exports = {
    content: [
        './src/*.html',
        './src/**/*.{html,js,ts,tsx,css}' 
    ],
    theme: {
        extend: {
            animation: {
             //   'drop-in': 'dropIn 0.6s ease-out forwards',
                'drop-in': 'drop-in 1s ease-out forwards',
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
                'drop-in': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                  }
            },
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
                'comfortaa': ['Comfortaa', 'sans-serif'],
            },
        },
        variants: {
            extend: {},
        },
        plugins: [],
    }
}
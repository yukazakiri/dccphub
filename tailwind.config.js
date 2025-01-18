/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderColor: {
                border: 'hsl(var(--border))'
            },
            backgroundColor: {
                background: 'hsl(var(--background))'
            },
            textColor: {
                foreground: 'hsl(var(--foreground))'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};

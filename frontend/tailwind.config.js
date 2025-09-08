// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: ["class"],
//     content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
// 		border: "#E5E7EB", 
//         primary: {
//           50: '#f5f3ff',
//           100: '#ede9fe',
//           200: '#ddd6fe',
//           300: '#c4b5fd',
//           400: '#a78bfa',
//           500: '#8b5cf6',
//           600: '#7c3aed',
//           700: '#6d28d9',
//           800: '#5b21b6',
//           900: '#4c1d95',
//           950: '#2e1065',
//         },
//         secondary: {
//           50: '#f0fdfa',
//           100: '#ccfbf1',
//           200: '#99f6e4',
//           300: '#5eead4',
//           400: '#2dd4bf',
//           500: '#14b8a6',
//           600: '#0d9488',
//           700: '#0f766e',
//           800: '#115e59',
//           900: '#134e4a',
//           950: '#042f2e',
//         },
//         accent: {
//           50: '#fff7ed',
//           100: '#ffedd5',
//           200: '#fed7aa',
//           300: '#fdba74',
//           400: '#fb923c',
//           500: '#f97316',
//           600: '#ea580c',
//           700: '#c2410c',
//           800: '#9a3412',
//           900: '#7c2d12',
//           950: '#431407',
//         },
//       },
//       animation: {
//         'spin-slow': 'spin 3s linear infinite',
//         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       },
//       boxShadow: {
//         'subtle': '0 2px 5px rgba(0, 0, 0, 0.05)',
//         'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
//       },
//     },
//   },
//   plugins: [],
// },






//   theme: {
//   	extend: {
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		},
//   		colors: {
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// }


/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
		  border: "hsl(var(--border))", // Merged with your earlier "#E5E7EB"
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
			// Added your primary color palette
			50: '#f5f3ff',
			100: '#ede9fe',
			200: '#ddd6fe',
			300: '#c4b5fd',
			400: '#a78bfa',
			500: '#8b5cf6',
			600: '#7c3aed',
			700: '#6d28d9',
			800: '#5b21b6',
			900: '#4c1d95',
			950: '#2e1065',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
			// Added your secondary color palette
			50: '#f0fdfa',
			100: '#ccfbf1',
			200: '#99f6e4',
			300: '#5eead4',
			400: '#2dd4bf',
			500: '#14b8a6',
			600: '#0d9488',
			700: '#0f766e',
			800: '#115e59',
			900: '#134e4a',
			950: '#042f2e',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
			// Added your accent color palette
			50: '#fff7ed',
			100: '#ffedd5',
			200: '#fed7aa',
			300: '#fdba74',
			400: '#fb923c',
			500: '#f97316',
			600: '#ea580c',
			700: '#c2410c',
			800: '#9a3412',
			900: '#7c2d12',
			950: '#431407',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
		  }
		},
		animation: {
		  'spin-slow': 'spin 3s linear infinite',
		  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		},
		boxShadow: {
		  'subtle': '0 2px 5px rgba(0, 0, 0, 0.05)',
		  'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
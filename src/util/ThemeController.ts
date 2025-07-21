import { CommandError } from "../commands/abstract";
import utility from "../utility"

class ThemeController {
    currentTheme: string
    constructor() {
        this.currentTheme = 'default'
        this.loadSavedTheme();(this.currentTheme)
    }

    applyTheme(name: string) {
        const theme = themes[name]
        if (!theme) {
            throw new CommandError(`The theme ${theme} doesn't exist...`)
        }

        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value)
        });

        this.currentTheme = name
        localStorage.setItem('theme', name)
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('theme')
        if (saved && themes[saved]) {
            this.applyTheme(saved)
        }
    }
}

type Theme = Record<string, string>

export const themes: Record<string, Theme> = {
  default: {
    'command-name': '#8c6b59',
    'preloaded-text': '#519975',
    'background-color': '#211d1b',
    'err-color': '#9c8394',
    'typer-color': '#73abad',
    'cursor-color': '#73abad',
    'prompt-color': '#519975',
    'terminalFont': 'monospace',
    'link': '#ce97bd',
    'link-hover': '#b796d6',
    'command-description': '#fff',
    'accent-color': '#ffffffbb',
    'copyright-text': 'rgb(180, 180, 129)',
  },

  light: {
    'command-name': '#336699',
    'preloaded-text': '#008800',
    'background-color': '#ffffff',
    'err-color': '#aa4444',
    'typer-color': '#444',
    'cursor-color': '#444',
    'prompt-color': '#444',
    'terminalFont': 'monospace',
    'link': '#0000ee',
    'link-hover': '#551a8b',
    'command-description': '#222',
    'accent-color': '#222222aa',
    'copyright-text': '#666',
  },

  hacker: {
    'command-name': '#00ff00',
    'preloaded-text': '#00aa00',
    'background-color': '#000000',
    'err-color': '#ff0000',
    'typer-color': '#00ff00',
    'cursor-color': '#00ff00',
    'prompt-color': '#00ff00',
    'terminalFont': 'monospace',
    'link': '#00ffff',
    'link-hover': '#ff00ff',
    'command-description': '#00ff00',
    'accent-color': '#00ff00aa',
    'copyright-text': '#888',
  },
  solarized: {
    'command-name': '#268bd2',
    'preloaded-text': '#2aa198',
    'background-color': '#fdf6e3',
    'err-color': '#dc322f',
    'typer-color': '#657b83',
    'cursor-color': '#657b83',
    'prompt-color': '#859900',
    'terminalFont': 'monospace',
    'link': '#6c71c4',
    'link-hover': '#d33682',
    'command-description': '#586e75',
    'accent-color': '#839496aa',
    'copyright-text': '#93a1a1',
  },

  dracula: {
    'command-name': '#ff79c6',
    'preloaded-text': '#50fa7b',
    'background-color': '#282a36',
    'err-color': '#ff5555',
    'typer-color': '#f8f8f2',
    'cursor-color': '#f8f8f2',
    'prompt-color': '#bd93f9',
    'terminalFont': 'monospace',
    'link': '#8be9fd',
    'link-hover': '#ffb86c',
    'command-description': '#f1fa8c',
    'accent-color': '#ffffffbb',
    'copyright-text': '#6272a4',
  },

  nord: {
    'command-name': '#81a1c1',
    'preloaded-text': '#a3be8c',
    'background-color': '#2e3440',
    'err-color': '#bf616a',
    'typer-color': '#d8dee9',
    'cursor-color': '#d8dee9',
    'prompt-color': '#88c0d0',
    'terminalFont': 'monospace',
    'link': '#5e81ac',
    'link-hover': '#b48ead',
    'command-description': '#e5e9f0',
    'accent-color': '#eceff4aa',
    'copyright-text': '#4c566a',
  },

  retro: {
    'command-name': '#ffaa00',
    'preloaded-text': '#00ffff',
    'background-color': '#000000',
    'err-color': '#ff0000',
    'typer-color': '#00ffff',
    'cursor-color': '#ffaa00',
    'prompt-color': '#ffaa00',
    'terminalFont': '"Courier New", monospace',
    'link': '#ffff00',
    'link-hover': '#ff00ff',
    'command-description': '#ffffff',
    'accent-color': '#ffff00aa',
    'copyright-text': '#888800',
  },

  minimal: {
    'command-name': '#111',
    'preloaded-text': '#333',
    'background-color': '#f5f5f5',
    'err-color': '#cc0000',
    'typer-color': '#111',
    'cursor-color': '#111',
    'prompt-color': '#666',
    'terminalFont': 'monospace',
    'link': '#0066cc',
    'link-hover': '#004499',
    'command-description': '#000',
    'accent-color': '#00000066',
    'copyright-text': '#999',
  },
}


export default new ThemeController()

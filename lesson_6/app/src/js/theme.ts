export type ThemeMode = 'light' | 'dark' | 'custom'

export class ThemeController {
    private readonly THEME_KEY = 'user-theme';
    private readonly CUSTOM_COLORS_KEY = 'custom-theme-colors';

    constructor() {
        this.applySavedTheme();
    }

    public applyTheme(theme: ThemeMode): void {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);

        if (theme === 'custom') {
            this.applyCustomColors();
        }
    }

    private applySavedTheme(): void {
        const savedTheme =
            (localStorage.getItem(this.THEME_KEY) as ThemeMode) || 'light';

        document.documentElement.setAttribute('data-theme', savedTheme);

        if (savedTheme === 'custom') {
            this.applyCustomColors();
        }
    }
    private applyCustomColors(): void {
        const raw : string | null = localStorage.getItem(this.CUSTOM_COLORS_KEY);
        if (!raw) return;

        const colors: Record<string, string> = JSON.parse(raw);

        Object.entries(colors).forEach(([cssVar, value]) => {
            document.documentElement.style.setProperty(cssVar, value);

        });
    }
    public clearCustomColors(): void {
        const raw :string | null = localStorage.getItem('custom-theme-colors');
        if (!raw) return;

        const colors: Record<string, string> = JSON.parse(raw);

        Object.keys(colors).forEach(cssVar => {
            document.documentElement.style.removeProperty(cssVar);
        });
    }


}

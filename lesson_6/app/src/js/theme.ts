export type ThemeMode = 'light' | 'dark';

export class ThemeController {
    private readonly THEME_KEY = 'user-theme';

    constructor() {
        this.applySavedTheme();
    }

    public applyTheme(theme: ThemeMode): void {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);
    }

    private applySavedTheme(): void {
        const savedTheme:ThemeMode = (localStorage.getItem(this.THEME_KEY) as ThemeMode) || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

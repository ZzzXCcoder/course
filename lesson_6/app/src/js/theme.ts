export type ThemeMode = 'light' | 'dark';

export class ThemeController {
    private readonly THEME_KEY = 'user-theme';

    constructor() {
        this.applySavedTheme();
    }

    public applyTheme(theme: ThemeMode): void {
        document.documentElement.setAttribute('data-theme', theme); // меняем атрибут
        localStorage.setItem(this.THEME_KEY, theme); // сохраняем тему
    }

    private applySavedTheme(): void {
        const savedTheme = (localStorage.getItem(this.THEME_KEY) as ThemeMode) || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

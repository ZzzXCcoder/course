    import { ThemeController } from './theme';
    const links: HTMLAnchorElement[] = Array.from(document.querySelectorAll('a[href^="#"]'));
    
    
    const sections: HTMLElement[] = links
        .map(link   => document.querySelector<HTMLElement>(link.getAttribute('href')!))
        .filter((el : HTMLElement | null): el is HTMLElement => el !== null);
    
    
    let sectionOffsets: number[] = sections.map(section => section.offsetTop);
    
    window.addEventListener('resize', () => {
        sectionOffsets = sections.map(section => section.offsetTop);
    });

    links.forEach(link => {
        link.addEventListener('click', (event: MouseEvent) => {
            const href : string|null = link.getAttribute('href');
            if (!href) return;
            const target: HTMLElement|null = document.querySelector<HTMLElement>(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    
    window.addEventListener('scroll', () => {
        const scrollY : number = window.scrollY;
        const activeIndex : number = getActiveSectionIndex(scrollY);
    
        if (activeIndex !== -1) {
           setTimeout(()=>setActiveLink(activeIndex), 20);
    
        }
    });
    
    
    function getActiveSectionIndex(scrollY: number): number {
        for (let i : number = 0; i < sections.length; i++) {
            const top : number = sectionOffsets[i];
            const nextTop : number = sectionOffsets[i + 1] ?? Infinity;
            if (scrollY >= top && scrollY < nextTop) return i;
        }
        return -1;
    }
    
    
    function setActiveLink(activeIndex: number) {
        links.forEach((link : HTMLAnchorElement, i) => {
            const li : HTMLElement| null = link.parentElement;
            if (!li) return;
    
            if (i === activeIndex) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }
    
    const themeController = new ThemeController();
    

    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle') as HTMLElement;
    
        const updateIcon = (theme: 'light' | 'dark') => {
            themeToggle.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
        };
    
        const currentTheme = localStorage.getItem('user-theme') as 'light' | 'dark' | null;
        updateIcon(currentTheme || 'light');
    
        themeToggle.addEventListener('click', () => {
            const newTheme = (document.documentElement.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
            themeController.applyTheme(newTheme);
            updateIcon(newTheme);
        });
    });
    
    
    let dateShower = document.getElementById('dateShower');
    if(dateShower !== null) {
        let dateTime:Date = new Date();
        dateShower.textContent = dateTime.toLocaleTimeString()
    }
    setInterval(() => {
        if(dateShower !== null) {
            let dateTime:Date = new Date();
            dateShower.textContent = dateTime.toLocaleTimeString();
        }
    }, 1000);
    
    const errorbtn:HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.error__button')
    let errorShower: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.error');
    if(errorbtn) {
        errorbtn.addEventListener('click', () => {
            if (errorShower){
                errorShower.style.display = 'none';
            }
    
        })
    
    }
    let nameInput : HTMLInputElement| null  = document.querySelector<HTMLInputElement>('#Name');
    let emailInput : HTMLInputElement| null  = document.querySelector<HTMLInputElement>('#Email');
    let messageTextarea : HTMLTextAreaElement | null = document.querySelector<HTMLTextAreaElement>('#Message');
    const sendContactbtn:HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('.base-section__middle-container__right-container__button')
    
    if (nameInput) {
        nameInput.addEventListener('click', () => {
            nameInput.style.backgroundColor = 'var(--altbackground-color)';
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('click', () => {
            emailInput.style.backgroundColor = 'var(--altbackground-color)';
        });
    }
    
    if (messageTextarea) {
        messageTextarea.addEventListener('click', () => {
            messageTextarea.style.backgroundColor = 'var(--altbackground-color)';
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (sendContactbtn){
        sendContactbtn.addEventListener('click', () => {
            if (errorShower) {
                if (!nameInput || nameInput.value === '' ) {
                    showError('Заполните строку с именем',nameInput)
                }
                if (!emailInput || !emailRegex.test(emailInput.value)) {
                    showError('Заполните почту правильно', emailInput)
                }
                if (!messageTextarea || messageTextarea.value.length < 10) {
                    showError('Сообщение для меня не заполнено или слишком маленькое', messageTextarea);
                }
            }
        })
    }
    
    let errorText : HTMLDivElement | null = document.querySelector<HTMLDivElement>('.error__text');
    function showError(errorMessage:string, errorelement: HTMLElement | null) {
        if(errorShower){
            errorShower.style.display = 'grid';
            if (errorText){
                errorText.textContent = errorMessage;
                if (errorelement) {
                    errorelement.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                }
    
            }
    
        }
    }
    
    
    
    
    

const links : NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');

links.forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const targedId: string | null = link.getAttribute('href');
        if (targedId === null) {
            return;
        }
        const targetSection: HTMLElement | null = document.querySelector(targedId);
        if (targetSection === null) {
            return;
        }
        targetSection.scrollIntoView({behavior: 'smooth'});
    });
})



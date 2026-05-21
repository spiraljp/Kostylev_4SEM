export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(onClick) {
        const button = document.createElement('button');
        button.className = 'button button_secondary';
        button.type = 'button';
        button.textContent = 'Назад';
        button.addEventListener('click', onClick);

        this.parent.append(button);
    }
}

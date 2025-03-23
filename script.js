document.addEventListener('DOMContentLoaded', function() {
    const coins = document.querySelectorAll('#coins img');
    const targetAmountElement = document.getElementById('target-amount');
    const currentAmountElement = document.getElementById('current-amount');
    const resetButton = document.getElementById('reset-button');

    let targetAmount = 0;
    let currentAmount = 0;

    // Генерація випадкової суми
    function generateTargetAmount() {
        targetAmount = Math.floor(Math.random() * 500) + 1;;
        targetAmountElement.textContent = (targetAmount/100).toFixed(2);
        updateCurrentAmount();
    }

    // Оновлення поточної суми
    function updateCurrentAmount() {
        currentAmountElement.textContent = (currentAmount/100).toFixed(2);
        if (currentAmount === targetAmount) {
            currentAmountElement.classList.add('green');
            currentAmountElement.classList.remove('red');
        } else if (currentAmount > targetAmount) {
            currentAmountElement.classList.add('red');
            currentAmountElement.classList.remove('green');
        } else {
            currentAmountElement.classList.remove('green', 'red');
        }
    }

    // Клік на монету
    coins.forEach(coin => {
        coin.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            currentAmount += value;

            const selectedCoin = this.cloneNode();
            const columnId = `${value}-column`;
            const column = document.getElementById(columnId);
            column.appendChild(selectedCoin);

            updateCurrentAmount();
        });
    });

    // Кнопка "Заново"
    resetButton.addEventListener('click', function() {
        currentAmount = 0;
        document.querySelectorAll('.coin-column').forEach(column => {
            column.innerHTML = column.getAttribute('id').replace('-column', '');
        });
        generateTargetAmount();
    });

    generateTargetAmount();
});
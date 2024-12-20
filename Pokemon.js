document.getElementById('summon').addEventListener('click', () => {
    const numCards = parseInt(document.getElementById('num-cards').value);
    const category = document.getElementById('category').value;

    if (numCards < 1 || numCards > 10) {
        alert('Please enter a number of cards between 1 and 10.');
        return;
    }

    window.location.href = `cards.html?numCards=${numCards}&category=${category}`;
});

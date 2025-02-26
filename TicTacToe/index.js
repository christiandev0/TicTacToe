let Matrix = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let row;
let column;
const min = 0;
const max = 2;
const riprovaBTN = document.getElementById("riprova")

function mossa(row, column) {
    let StringedRow = String(row);
    let StringedColumn = String(column);
    let value = StringedRow + StringedColumn;
    let result = document.getElementById(value);

    if (Matrix[row][column] !== '') {
        alert("Non puoi giocare qui!");
        return;
    }

    // Mossa utente
    result.textContent = 'X';
    Matrix[row][column] = 'X';

    // Controllo vittoria
    if (VerifyWin('X')) {
        document.getElementById("esito").textContent = "Hai Vinto!";
        riprovaBTN.style.display = 'block';
        riprovaBTN.addEventListener('click', () => {
            location.reload(); 
        });
    }

    // Mossa del bot
    BOT();
}

function BOT() {
    let RandomNumberRow, RandomNumberColumn;
    let trovato = false;

    // Trova una cella vuota senza ricorsione infinita
    while (!trovato) {
        RandomNumberRow = Math.floor(Math.random() * (max - min + 1));
        RandomNumberColumn = Math.floor(Math.random() * (max - min + 1));

        if (Matrix[RandomNumberRow][RandomNumberColumn] === '') {
            trovato = true;
        }
    }

    let StringedRandomRow = String(RandomNumberRow);
    let StringedRandomColumn = String(RandomNumberColumn);
    let valueBOT = StringedRandomRow + StringedRandomColumn;
    let resultBOT = document.getElementById(valueBOT);

    // Mossa del bot
    resultBOT.textContent = 'O';
    Matrix[RandomNumberRow][RandomNumberColumn] = 'O';

    // Controllo vittoria
    if (VerifyWin('O')) {
        document.getElementById("esito").textContent = "Il bot ha vinto!";
        riprovaBTN.style.display = 'block';
        riprovaBTN.addEventListener('click', () => {
            location.reload(); 
        });
    }
}

function VerifyWin(move) {
    let winConditions = [
        // Righe
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Colonne
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonali
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let condition of winConditions) {
        let [A, B, C] = condition;
        if (Matrix[A[0]][A[1]] === move && Matrix[B[0]][B[1]] === move && Matrix[C[0]][C[1]] === move) {
            return true;
        }
    }
    return false;
}

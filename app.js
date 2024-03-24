let currentRow = 0;
  let currentCol = 0;

  const palavras = ["HTML", "CSS", "JavaScript", "DOM", "API", "Framework", "Bootstrap", "React", "Angular", "Vue", "Node.js", "Express", "MongoDB", "SQL", "REST", "HTTP", "AJAX", "JSON", "Responsive", "Git"];

  const rows = 6;
  const columns = 6;

  function criarTabuleiro() {
    const tabuleiro = document.getElementById("tabuleiro");
    const tbody = tabuleiro.getElementsByTagName("tbody")[0];
    for (let i = 0; i < rows; i++) {
      const linha = document.createElement("tr");
      for (let j = 0; j < columns; j++) {
        const coluna = document.createElement("td");
        if ((i + j) % 2 == 0) {
          coluna.className = "branco";
        } else {
          coluna.className = "preto";
        }
        linha.appendChild(coluna);
      }
      tbody.appendChild(linha);
    }
    // Adicionando cursor na célula inicial (0, 0)
    atualizarCursor();
  }

  function atualizarCursor() {
    const tabuleiro = document.getElementById("tabuleiro");
    const celulas = tabuleiro.querySelectorAll("td");
    for (let i = 0; i < celulas.length; i++) {
      celulas[i].classList.remove("cursor");
    }
    const index = currentRow * columns + currentCol;
    celulas[index].classList.add("cursor");
  }

  function verificarPalavra() {
    const tabuleiro = document.getElementById("tabuleiro");
    const celulas = tabuleiro.querySelectorAll("td");
    let palavra = "";
    celulas.forEach(function(celula) {
      palavra += celula.textContent;
    });
    if (palavras.includes(palavra.toUpperCase())) {
      celulas.forEach(function(celula) {
        celula.classList.remove("erro");
        celula.classList.add("acerto");
      });
      alert("Você acertou!");
    } else {
      celulas.forEach(function(celula) {
        celula.classList.remove("acerto");
        celula.classList.add("erro");
      });
      alert("Você errou! Tente novamente.");
    }
  }

  function inserirLetra(letra) {
    const tabuleiro = document.getElementById("tabuleiro");
    const celulas = tabuleiro.querySelectorAll("td");
    const index = currentRow * columns + currentCol;
    celulas[index].textContent = letra;
    if (currentCol <columns - 1) {
      currentCol++;
    } else {
      currentCol = 0;
      currentRow++;
      if (currentRow > rows - 1) {
        currentRow = rows - 1;
      }
    }
    atualizarCursor();
  }

  function inserirBackspace() {
    const tabuleiro = document.getElementById("tabuleiro");
    const celulas = tabuleiro.querySelectorAll("td");
    if (currentCol > 0 || currentRow > 0) {
      if (currentCol === 0 && currentRow > 0) {
        currentRow--;
        currentCol = columns - 1;
      } else {
        currentCol--;
      }
      const index = currentRow * columns + currentCol;
      celulas[index].textContent = "";
      atualizarCursor();
    }
  }

  window.onload = criarTabuleiro;

  document.addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase();
    console.log("Tecla pressionada:", key);
    if (key === "ARROWUP") {
      if (currentRow > 0) {
        currentRow--;
        atualizarCursor();
      }
    } else if (key === "ARROWDOWN") {
      if (currentRow < rows - 1) {
        currentRow++;
        atualizarCursor();
      }
    } else if (key === "ARROWLEFT") {
      if (currentCol > 0) {
        currentCol--;
        atualizarCursor();
      }
    } else if (key === "ARROWRIGHT") {
      if (currentCol < columns - 1) {
        currentCol++;
        atualizarCursor();
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      inserirLetra(key);
    } else if (key === "BACKSPACE") {
      inserirBackspace();
    } else if (key === "ENTER") {
      verificarPalavra();
    }
  });
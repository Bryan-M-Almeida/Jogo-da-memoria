const gameContainer = document.querySelector('.game-container');
        let cards = []; // Array para armazenar as cartas
        let flippedCards = []; // Array para cartas viradas atualmente
        let matchedPairs = 0; // Contador de pares encontrados

        // Array com símbolos ou valores para as cartas (pares)
        const cardValues = [
            'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
            'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
        ];

        // Função para embaralhar o array de valores das cartas (Fisher-Yates shuffle)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
            }
        }

        // Função para criar as cartas no HTML
        function createCards() {
            shuffleArray(cardValues); // Embaralha os valores antes de criar as cartas
            cardValues.forEach(value => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.value = value; // Armazena o valor da carta no dataset

                const cardFront = document.createElement('div');
                cardFront.classList.add('card-front');
                cardFront.textContent = value; // Exibe o valor na frente da carta

                const cardBack = document.createElement('div');
                cardBack.classList.add('card-back');

                card.appendChild(cardFront);
                card.appendChild(cardBack);
                gameContainer.appendChild(card);

                card.addEventListener('click', flipCard); // Adiciona evento de clique para virar a carta
                cards.push(card); // Adiciona a carta ao array de cartas
            });
        }

        // Função para virar a carta
        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains('flip') && !this.classList.contains('matched')) {
                this.classList.add('flip');
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 1000); // Espera um pouco antes de verificar o par
                }
            }
        }

        // Função para verificar se as cartas viradas são um par
        function checkMatch() {
            const card1 = flippedCards[0];
            const card2 = flippedCards[1];

            if (card1.dataset.value === card2.dataset.value) {
                // É um par!
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                flippedCards = []; // Limpa o array de cartas viradas

                if (matchedPairs === cardValues.length / 2) {
                    // Jogo completo!
                    alert('Parabéns! Você venceu o Jogo da Memória!');
                    resetGame(); // Reinicia o jogo após vencer
                }
            } else {
                // Não é um par, desvira as cartas
                setTimeout(() => {
                    card1.classList.remove('flip');
                    card2.classList.remove('flip');
                    flippedCards = []; // Limpa o array de cartas viradas
                }, 1000);
            }
        }

        // Função para reiniciar o jogo
        function resetGame() {
            gameContainer.innerHTML = ''; // Limpa o container de cartas
            cards = []; // Limpa o array de cartas
            flippedCards = []; // Limpa o array de cartas viradas
            matchedPairs = 0; // Reseta o contador de pares
            createCards(); // Cria um novo jogo de cartas
        }

        // Inicializa o jogo quando a página carrega
        createCards();
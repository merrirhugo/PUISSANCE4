class P4 {

    constructor(selector) {
        this.COL = $('.nbr_col').val()
        this.LGN = $('.nbr_lgn').val()
        this.selector = selector
        this.player = $('.player1_color').val()
        this.drawGame()
        this.ecoute()
        this.checkWin()
    }

    /**
     * Fonction qui permet l'affichage du jeu
     */
    drawGame() {
        const $jeu = $(this.selector);

        for(let lgn=0; lgn < this.LGN; lgn++) {
            const $lgn = $('<div>').addClass('lgn')
            for(let col=0; col < this.COL; col++) {
                const $col = $('<div>').addClass('col empty').attr('data-col', col).attr('data-lgn', lgn)
                $lgn.append($col);
            }
            $jeu.append($lgn)        }
    }

    /**
     * Fonction qui permet d'intéragir avec le jeu 
     */
    ecoute() {
        const $jeu = $(this.selector)
        const that = this
        // On cherche la dernière case libre 
        function lastCase(col) {
            // On stocke toute les cellules qui ont la même data-colonne
            const $cells = $(`.col[data-col='${col}']`)
            // On boucle pour parcourir le tableau (de bas en haut d'où -1)
            for(let i=$cells.length-1; i >= 0;i--) {
                // On stocke la variable actuelle
                const $cell = $($cells[i])
                // Retourne la valeur uniquement s'il a la classe vide
                if($cell.hasClass('empty')) {
                    return $cell
                }
            }
            return null
        }

        $jeu.on('mouseenter', '.col.empty', function() {
            const $col = $(this).data('col')
            const $last = lastCase($col)
            if($last != null) {
                $last.css('background-color', `${that.player}`)
            }
        })

        $jeu.on('mouseleave', '.empty', function() {
           $(".empty").css('background-color', "black")
        })

        $jeu.on('click', '.col.empty', function(event) {
            const col = $(this).data('col')
            const $last = lastCase(col)
            $last.css("background-color", `${that.player}`).removeClass("empty").data('player', `${that.player}`)
            
            const winner = that.checkWin($last.data('lgn'), $last.data('col'))

            
            // On switch grâce a une ternaire entre les joueurs
            that.player = (that.player === $('.player1_color').val()) ? $('.player2_color').val() : $('.player1_color').val()
            
            var text = $('#role').text()
            text = (text === "Joueur 1") ? $('#role').text("Joueur 2") : $('#role').text("Joueur 1")
            
            var audio = document.getElementById('victory')
            var lose = document.getElementById('lose')


            // On vérifie si il y a un gagnant
            if(winner === $('.player1_color').val()) {
                
                 $('#win').text(`Bravo, Joueur 1 a gagné la partie !`)
                 $('#win').css('visibility', "visible")
                 $('#restart').css('visibility',"visible")
                 $('#role').css('visibility', 'hidden')
                 audio.play()
                 $jeu.off()

            } else if (winner === $('.player2_color').val()) {

                $('#win').text(`Bravo, Joueur 2 a gagné la partie !`)
                $('#win').css('visibility', "visible")
                $('#restart').css('visibility',"visible")
                $('#role').css('visibility', 'hidden')
                audio.play()
                $jeu.off()

                // On vérifie si il y a match nul
            } else if($('.empty').length == 0) {
                $('#win').text(`MATCH NUL, aucun des 2 joueurs n'ont gagné !`)
                $('#win').css('visibility', "visible")
                $('#restart').css('visibility',"visible")
                $('#role').css('visibility', 'hidden')
                lose.play()
                $jeu.off()

            }
        })
    }

    /**
     * Fonction qui permet de vérifier si le joueur à gagner 
     * @param {*} lgn 
     * @param {*} col 
     * @returns 
     */
    checkWin(lgn, col) {
        const that = this;

        function $getCell(i, j) {
            return $(`.col[data-lgn='${i}'][data-col='${j}']`)
        }

        function checkDirection(direction) {
            let total = 0
            let i = lgn + direction.i
            let j = col + direction.j
            let $next = $getCell(i, j)
            while( i >= 0 && i < that.LGN && j >= 0 && j < that.COL && $next.data('player') === that.player) {
                total++;
                i += direction.i
                j += direction.j
                $next = $getCell(i, j)
            }
            return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 + checkDirection(directionA) + checkDirection(directionB)
            if(total >= 4) {
                return that.player
            } else {
                return null
            }
        }

        function checkHoriz() {
            return checkWin({i: 0, j: -1}, {i: 0, j: 1})
        }

        function checkVert() {
            return checkWin({i: -1, j: 0}, {i: 1, j: 0})
        }

        function checkDiag1() {
            return checkWin({i: 1, j: 1}, {i: -1, j: -1})
        }

        function checkDiag2() {
            return checkWin({i: 1, j: -1}, {i: -1, j: 1})
        }

        return checkHoriz() || checkVert() || checkDiag1() || checkDiag2()
        
    }
}
$("#game").ready(function() {
    
    // On initialise le jeu en fonction du choix de l'utilisateur
    $('#send').on('click', function() {

        var start = document.getElementById('start')
        start.play()
        if($('.nbr_col').val() < 4 || $(".nbr_lgn").val() < 4 ) {
            alert("Veuillez choisir un nombre de colonne et un nombre de ligne, (minimum 4x4)")
        } else {
            if($('.player1_color').val() == $('.player2_color').val()) {
                alert("Veuillez choisir une couleur unique pour chaque joueur")
            } else {
                $("#role").css('visibility','visible')
                $('#game').css('visibility','visible')
                $('#print_form').css('display','none')
                // On crée le jeu paramètré
                const p4 = new P4('#game')

                // On relance le jeu
                $('#restart').on('click', function() {
                    start.play()
                    $('#game').empty()
                    const p4 = new P4('#game')
                    $('#restart').css('visibility','hidden')
                    $('#role').css('visibility','visible')
                    $('#role').text("Joueur 1")
                    $('#win').css('visibility','hidden')
                })

            }
    
        }

        
    
    })

})
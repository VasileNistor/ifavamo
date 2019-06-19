const formulaire = document.querySelector('form');

formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();

    const valeurChampVille = document.querySelector('[name="city-search"]').value;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function (event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log("Réponse reçue: %s", this.responseText);
                const data = JSON.parse(this.responseText);
                const icon_big = data.current_condition['icon_big'];
            

                document.querySelector('h2.ville').textContent = data.city_info['name'];
                document.querySelector('h2.date').textContent = data.current_condition['date'];
                document.querySelector('h2.hour').textContent = data.current_condition['hour'];
                document.querySelector('h2.tmp').textContent = data.current_condition['tmp'];
                document.querySelector('h2.condition').textContent = data.current_condition['condition'];

                document.querySelector('img.icon').textContent = data.current_condition['icon_big'];
                
                const image = document.querySelector("img");
                image.src = data.current_condition['icon_big'];

                console.log(cityInfo, date,heure, tmp, condition, icon);

            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', 'http://www.prevision-meteo.ch/services/json/' + valeurChampVille, true);
    req.send(null);
});
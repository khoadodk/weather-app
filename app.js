window.addEventListener('load', () => {
    let long;
    let lat; 
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let timeZone = document.querySelector('.location-timezone');
    let temp = document.querySelector('.temperature');
    let tempSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/77eda3b827c8a953cb75093634a08f2c/${lat},${long}`;
            
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data)
                    let { temperature, summary, icon } = data.currently;
                    tempDegree.innerText = Math.floor(temperature);
                    tempDescription.innerText = summary;
                    timeZone.innerText = data.timezone;

                    setIcons(icon, document.querySelector('.icon'));
                    
                    //Toggle Temperature Unit
                    temp.addEventListener('click', () => {
                        let celcius = (temperature - 32) * (5 / 9);
                        if(tempSpan.innerText === 'Fahrenheit'){
                            tempSpan.innerHTML = 'Celcius';
                            tempDegree.innerHTML = Math.floor(celcius);
                        }else{
                            tempSpan.innerHTML = 'Fahrenheit';
                            tempDegree.innerHTML = Math.floor(temperature);
                        }
                    })
            })
        });
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({ color: "rgb(6, 61, 61)" });

        //DarkSky API return icon with dash -, use regex to change to underscore _ and uppercase
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});
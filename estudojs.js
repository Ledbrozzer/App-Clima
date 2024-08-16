//alert(oi)
// evitar o formulario ser enviado e crashar a pag
// o id do botão -> event Listener -> passar o parâmetro
// dentro () por o evento + uma ArrowFunction
//submit -> entre parenteses o event -> vai receber o evento
// abre as chaves digita event e p/ evitar q envie o form e de erro ->
// coloc PreventDefault...
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();
    //usar o fetch p/ fazer a chamada da API -> tem q usar o async 

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        return showAlert("Informe uma cidade!")
    }

    //console.log(cityName)
    const apiKey = '';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric`
    // --> encodeURI() => p/ conseguir usar o acento nas requisições da API

    //variavel p/ result
    //realiz chamad da API usand fetch
    const results = await fetch(apiUrl);
    const json = await results.json();

    //console.log(json);
//se a reuisição for success vai retornar 200, criar condição p/ isso:
    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            //Deve passar onde está cada valor da resposta de acordo com o que a API mandou
            // 'temp-max' e 'temp-min' não vai conseguir identificar tem q tirar: '-' e por o '_'!!
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
        //passar os dados da requisição (que foram selected)
    } else {
        //tem q por o ID do weather usando o identificador!! -> ' # '
        document.querySelector("#weather").classList.remove('show');
        //.remove -> p/ remover as informações previas
        // deixar só o alert(p/ não poluir a tela)
        showAlert(`
            Não foi possivel localizar o valor digitado
            <i class="fa-solid fa-person-digging"></i>
        `)
    }
});
//pegar a cidade quand digit
// pegar o input, constant = cityname
// usar querySelector p/ pegar o ID
// .value p/ pegar o input(só o valor)
// colocar condiç if
// caso valor for dif de city(se n digit)
// solte 1 alerta

//função p/ mostrar results na tela
function showInfo(json){
    //Nome da função tem q estar correto... ants estv 'showinfo' -> js n conseguia ler o valor!!

    //p/ pegar dados -> tem q passar eles dentro do if (json.cod === 200)
    showAlert('');
//add a classe 'show' no weather quando digitar a cidade
// tirou do html p/ colocar c/ o js
// só q tem que passar a classe correta p/ conseguir identificar onde vai colocar(add) o 'show'
// -> p/ exibir as infos da requisição

    document.querySelector("#weather").classList.add('show');
    //add o titulo
    // vai pegar do json(no if)
    // a cidade que passou p/ ele... outrs dados
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#prediction-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    //colocar tag <sup> pra aparecer dps
    //trocar o display dos N°-> aparece c/ 2digit dps do '.'
    // p/ trocar p/ 1 => toFixed(1)
    // p/ trocar o '.' pela virgula ',' na hora de mostrar a temp:
    // toString() => p/ convert to text e poder usar a ','
    // replace() => p/ dizer q vai trocar // e passar os values que vão ser changed

    document.querySelector('#weather-description').innerHTML = `${json.description}`;
    //p/ trocar a img tem q trocar atributo src
    // trocar a url que tem lá -> p/ url q receb da API
    document.querySelector('#img-prediction').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#max-temp').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector('#min-temp').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
//Temptrs max e min -> o id dels tav errd

    document.querySelector('#humidity').innerHTML = `${json.humidity} <small>%</small>`;

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} <small>km/h</small>`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg
}
const colors = [
    { variant: "Vermillion", hex: "#2E191B" },
    { variant: "Forest", hex: "#0B6623" },
    { variant: "Navy", hex: "#000080" },
    { variant: "Crimson", hex: "#DC143C" },
    { variant: "Sky Blue", hex: "#87CEEB" },
    { variant: "Lime", hex: "#00FF00" },
    { variant: "Gold", hex: "#FFD700" },
    { variant: "Lavender", hex: "#E6E6FA" },
    { variant: "Tangerine", hex: "#F28500" },
    { variant: "Magenta", hex: "#FF00FF" },
    { variant: "Cyan", hex: "#00FFFF" },
    { variant: "Olive", hex: "#808000" },
    { variant: "Teal", hex: "#008080" },
    { variant: "Maroon", hex: "#800000" },
    { variant: "Coral", hex: "#FF7F50" }
];

// Módulo interno
const http = require('http');

// Creamos servidor y lo asigno a una variable
const server = http.createServer((req, res) => {

    // Nos quedamos con la propiedad url del objeto req (request)
    // Para obtener la URL del objeto request usaremos el operador de desestructuración de objetos
    const { url } = req;
    // Para establecer el tipo de contenido de la respuesta HTTP
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (url.startsWith("/color")) {

        // Iteración 3: Comprobar si me han pasado una queryString o no. En caso de que si: obtener el color en función del ?variant=Vermillion. En caso contrario obtener un color aleatório

        // obtener un color aleatório
        const indexRandomColor = Math.floor(Math.random() * colors.length);
        const randomColor = colors[indexRandomColor];

        // me quedo con la propiedad .hex del color
        const { hex } = randomColor;
        res.end(`<p style="color: ${hex}">${hex}</p>`)

    } else {

        // Especificar que vamos a enviar un html
        // Tenemos que especificar que la codificación es utf-8

        res.write('<h1>Bienvenido al servidor de colores</h1>');
        res.write('<p>Haz una petición a /color para obtener un color aleatório</p>');
        res.end();
    }
});

// levantamos el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Server running in port 3000');
});
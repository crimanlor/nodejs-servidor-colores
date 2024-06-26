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

// Importación de módulos
// Módulos Internos: No necesitan instalación. Se incluyen con Node.js y se pueden usar directamente.
// Módulos de Terceros: Necesitan ser instalados usando npm antes de poder ser utilizados. Se almacenan en la carpeta node_modules de tu proyecto.

// Módulos internos
//Para crear el servidor
const http = require('http');

//Para leer archivos del sistema de archivos
const fs = require('fs');

// Parsear las cadenas de consulta (query strings)
const querystring = require('querystring');

// Módulo de terceros lodash para seleccionar un elemento aleatorio del array. Al estar instalado en node_modules podemos importarlo como si fuera un módulo interno
const _ = require('lodash');

// Creamos servidor y lo asignamos a una variable
const server = http.createServer((req, res) => {

    // Nos quedamos con la propiedad url del objeto req (request)
    // Para obtener la URL del objeto request usaremos el operador de desestructuración de objetos
    const { url } = req;
    // Para establecer el tipo de contenido de la respuesta HTTP
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // PETICIÓN CON QUERY STRING (/color?variant=...)
    // - Si se encuentra, se devuelve el color.
    // - Si no se encuentra, se elige un color al azar y se informa al usuario que el color solicitado no existe.
    
    if (url.startsWith("/color?")) {
        // Usamos el operador de desestructuración para asignar a la variable path la primera posición del array y a la variable queryString la segunda posición del array
        const [path, queryString] = req.url.split('?');
        // Si la URL empieza con `/color?`, se extrae la query string y se parsea. 
        const qs = querystring.parse(queryString);
        console.log("🚀 ~ file: app.js:39 ~ server ~ qs:", qs);
        
        // 1. Utilizar el método de array adecuado para buscar la variante del color en el array 'colors'

        // Se busca el color solicitado en el array `colors`.
        const chosenColor = colors.find(color => color.variant == qs.variant);
        console.log("🚀 ~ file: app.js:44 ~ server ~ chosenColor:", chosenColor)

        if (chosenColor) {
            // Si encuentra el color, se devuelve
            res.end(`<p style="color: ${chosenColor.hex}">${chosenColor.hex}</p>`);
        }
        else {
            // Si no se encuentra, se elige un color al azar y se informa al usuario que el color solicitado no existe.
            const randomColor = _.sample(colors)
            res.write(`El color <strong>${qs.variant}</strong>  elegido no EXISTE. Hemos obtenido un color al azar`);
            res.end(`<p style="color: ${randomColor.hex}">${randomColor.hex}</p>`);
        }

    // PETICIÓN SIN QUERY STRING (/color...) 
    } else if (url == "/color") {

        // Si no se ha pasado query string, obtener un color aleatório
        const indexRandomColor = Math.floor(Math.random() * colors.length);
        const randomColor = colors[indexRandomColor];

        // me quedo con la propiedad .hex del color
        const { hex } = randomColor;
        res.statusCode = 200;
        res.end(`<p style="color: ${hex}">${hex}</p>`)

    // PETICIÓN A LA RAÍZ (/)
    } else if (url == "/") {
        // Si la URL es /, se muestra un mensaje de bienvenida y una instrucción sobre cómo obtener un color.
        res.write('<h1>Bienvenido al servidor de colores</h1>');
        res.write('<p>Haz una petición a /color para obtener un color aleatório</p>');
        res.end();

    // PETICIÓN A URL DESCONOCIDA
    } else {
        // El recurso/endpoint/ruta que intentas acceder no existe
        res.statusCode = 404;
        // Le enviamos el fichero 404.html
        // Voy a leer el fichero con un método síncrono
        const htmlContent = fs.readFileSync("./404.html")
        res.end(htmlContent)

        // BONUS
        // Si usas un map para hacer el bonus
        // 1. hacer un forEach y para cada elemento del array puedes hacer un res.write()
        // 2. Otra forma seria crear un array de string con <li>, y luego jutnarlos todos con un método de array que te permite transformar un array en un string

    }
});

// levantamos el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Server running in port 3000');
});
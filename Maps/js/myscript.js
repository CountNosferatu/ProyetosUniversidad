let map;
let inputLat = document.getElementById("InputLat");
let inputLng = document.getElementById("InputLng");
let inputName = document.getElementById("Name");
let inputAddress = document.getElementById("Address");
let inputStreet = document.getElementById("Street");
let inputDescription= document.getElementById("Description");
let inputNumber = document.getElementById("number");
let inputEmail = document.getElementById("Email");
let inputInfo = document.getElementById("Contact");
let inputbtn1 = document.getElementById("btn1");
const inputSearch = document.querySelector(".tlacuache");
const searchButton = document.querySelector(".coler");
let modalgei = document.getElementById("modalgei");
        let close2 = document.getElementById("close2");
        let btn4 = document.getElementById("btn4");

        btn4.onclick = function() {
            modalgei.style.display = "block";
        };

        close2.onclick = function() {
            modalgei.style.display = "none";
        };

        let modal = document.getElementById("MyModal");
        let btn = document.getElementById("btn3");
        let span = document.getElementById("close");

        btn.onclick = function () {
            modal.style.display = "block";
        };

        span.onclick = function() {
            modal.style.display = "none";
        };


const firebaseConfig = {
  apiKey: "AIzaSyCaEhpFYVlhq08wMhq5gYWNxM6QC831GBg",
  authDomain: "myapp-80b54.firebaseapp.com",
  projectId: "myapp-80b54",
  storageBucket: "myapp-80b54.appspot.com",
  messagingSenderId: "681070161020",
  appId: "1:681070161020:web:ee0f0af2394d215f7c2df9",
};
   //Iniatialize firebase
   //Iniatialize firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const fb = db.collection("mydatabase");
let lugaresarray = [];

fb.get().then((quertySnapshot) => {
  quertySnapshot.forEach((doc) => {
    const lugar = doc.data();
    lugaresarray.push({
      name: lugar.inputName,
      lat: lugar.inputLat,
      lng: lugar.inputLng,
      adress: lugar.inputAddress,
      street: lugar.inputStreet,
      description: lugar.inputDescription,
      number: lugar.inputNumber,
      email: lugar.inputEmail,
      info: lugar.inputInfo
    });
  });
});

console.log(lugaresarray);

// SERIALIZACION
document.getElementById("mapsform").addEventListener("submit", function (e) {
  e.preventDefault(); //prevent the default from submission
  console.log("Submit en la forma");

  const formData = new FormData(this); // this se refiere a la forma
  const formDataObject = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log(formDataObject); //ya tengo los datos

  const arregloform = db.collection("mydatabase");
  arregloform.add(formDataObject);
});
addtofirebase = () => {
  //es una función con flechita
  //console.log("El botón te dice hola");

  /*db.collection("mydatabase").doc().set({
    lat: "1500",
    lng: "1000",
    nombre: "si",
  });*/
};

inputbtn1.addEventListener("click", addtofirebase);
/*const locations = [
  { lat: 25.5011835, lng: -103.551441 }, //0
  { lat: 24.5011835, lng: -102.541441 }, //1
  { lat: 23.5011835, lng: -101.531441 }, //2
  { lat: 22.5011835, lng: -100.521441 }, //3
  { lat: 25.5011835, lng: -104.551441 }, //4
];*/

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const myLatLong = { lat: 25.5011835, lng: -103.551441 };
  let zoom = 16;
  let booleane = true;

  map = new Map(document.getElementById("map"), {
    center: {lat: 25.54264, lng: -103.52141},
    zoom: zoom,
    disableDefaultUI: booleane,
  });

  const lugares = db.collection("mydatabase");

  

  let lugaresarray = [];
  await lugares.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const lugar = doc.data();
      lugaresarray.push({
        lat: parseFloat(lugar.InputLat),
        lng: parseFloat(lugar.InputLng),
        //title: lugar.InputName
        name: lugar.Name,
      street: lugar.Street,
      description: lugar.Description,
      number: lugar.number,
      email: lugar.Email,
      info: lugar.Contact,
      address: lugar.Address
      });
    });
  }); 

  const inputSearch = document.getElementById("inputSearch");

// Función para cargar las opciones de ubicación desde Firebase al datalist
function loadLocationOptions() {
  const datalist = document.getElementById("locationOptions");
  datalist.innerHTML = ""; // Limpiar opciones anteriores
  lugaresarray.forEach((lugar) => {
    const option = document.createElement("option");
    option.value = lugar.name; // Mostrar el nombre de la ubicación
    datalist.appendChild(option);
  });
}

// Event listener para el click en el input de búsqueda
inputSearch.addEventListener("click", loadLocationOptions);

// Event listener para el click en el botón de búsqueda
searchButton.addEventListener("click", function (e) {
  e.preventDefault(); // Evitar que el formulario se envíe

  const selectedLocation = inputSearch.value; // Obtener la ubicación seleccionada
  const location = lugaresarray.find((lugar) => lugar.name === selectedLocation); // Buscar la ubicación en el array

  if (location) {
    // Si se encuentra la ubicación
    const { lat, lng } = location; // Obtener las coordenadas de la ubicación
    map.setCenter({ lat, lng }); // Centrar el mapa en las coordenadas de la ubicación
    map.setZoom(16); // Establecer el zoom del mapa
  } else {
    alert("Location not found!"); // Mostrar un mensaje si la ubicación no se encuentra
  }
});

  map.addListener("click", (e) => {
    //alert("Hola");
    const markers = new google.maps.Marker({
      position: e.latLng,
      //title: place.name,
      map,
      icon: {
        url: "img/geo-alt.svg", // Ruta del archivo SVG
        scaledSize: new google.maps.Size(40, 40), // Tamaño del icono
        fillColor: "black", // Color del icono
      },
    });
    inputLat.value = e.latLng.lat(0);
    inputLng.value = e.latLng.lng(0);
    //inputname.value = place.name("");

    document.getElementById("mapsform").addEventListener("reset", ()=>{
        markers.setMap(null);
    });

  });

  /*let marker1 = new google.maps.Marker({
    position: {lat: 25.542645218342038, lng: -103.52140126387742}, // 25.542645218342038, -103.52140126387742
    map,
    title: "ROSTICERÍA EL PECHUGÓN (LERDO)",
  });

  let marker2 = new google.maps.Marker({
    position: { lat: 25.542459008081018, lng: -103.52160892725388 }, //25.542459008081018, -103.52160892725388
    map,
    title: "POLLO FELIZ (LERDO)",
    //icon: "img/si.png",
  });

  let marker3 = new google.maps.Marker({
    position: { lat: 25.554633749454847, lng: -103.50107945502693 }, // 25.554633749454847, -103.50107945502693
    map,
    title: "POLLO LOCO (MIGUEL ALEMÁN)",
  }); 

  let marker4 = new google.maps.Marker({
    position: {lat: 25.546330938116057, lng: -103.45123165843597}, //25.546330938116057, -103.45123165843597
    map,
    title: "POLLO LOCO (INDEPENDENCIA)",
  });

  let marker5 = new google.maps.Marker({
    position: {lat: 25.534851602349256, lng: -103.39967953859032}, //25.534851602349256, -103.39967953859032
    map, 
    title: "POLLO LOCO (REVOLUCIÓN)",
  });

  let marker6 = new google.maps.Marker({
    position: {lat: 25.534766626328345, lng: -103.52379042368274}, 
    map, 
    title: "POLLO FELIZ (LERDO, ALDAMA)",
  });

  let marker7 = new google.maps.Marker({
    position: {lat: 25.5587004129699, lng: -103.5062390966522}, 
    map, 
    title: "POLLO FELIZ (AGUSTÍN CASTRO)",
  });

  let marker8 = new google.maps.Marker({
    position: {lat: 25.5375389504849, lng: -103.44837064525773}, 
    map, 
    title: "POLLO PECHUGÓN (COLÓN)",
  }); */


  const markers = lugaresarray.map((local) => {
    const marker = new google.maps.Marker({
      position: local,
      map,
      //title: "Marker #" + i,
      //label: "M" + i,
    });
    const infowindowContent = `
    <h3>${local.name}</h3>
    <p>${local.lat}</p>
    <p>${local.lng}</p>
    <p>${local.address}</p>
    <p>${local.street}</p>
    <p>${local.description}</p>
    <p>${local.number}</p>
    <p>${local.email}</p>
    <p>${local.info}</p>
    `;
  
   
    const infowindow = new google.maps.InfoWindow({
        content: infowindowContent
    });
  
   
    marker.addListener("click", () => {
      infowindow.open(map, marker);
  });
    return marker;
  });
  new markerClusterer.MarkerClusterer({ markers, map });

  document.addEventListener("DOMContentLoaded", function(){
    const modalForm = document.getElementById("mapsform");
    
    modalForm.addEventListener("submit", function(event){
      event.preventDefault();
      this.reset();
    });
    inputbtn1.addEventListener("click", function(){
      modalgei.style.display = "none";
    });
    });

  /*let ventanita = new google.maps.InfoWindow({
    content: "Aquí venden pollo"
  });*/

  /*markers.push(marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8);
ventanita.open(map, marker1);
ventanita.open(map, marker2);
ventanita.open(map, marker3);
ventanita.open(map, marker4);
ventanita.open(map, marker5);
ventanita.open(map, marker6);
ventanita.open(map, marker7);
ventanita.open(map, marker8);*/

  /*map.addListener("click",() => {
    console.log("click");
  });

  //La letra trae toda la información de click 
   /*map.addListener("click",(e) => {
    console.log(e);
     }); */

  /* map.addListener("dblclick",() => {
    console.log("doble click en el mapa");
  });

  map.addListener("zoom_changed",() => {
    console.log("cambió el zoom");
  });*/

  /*map.addListener("center_changed", () => {
    window.setTimeout(() => {
      map.panTo(marker1.getPosition());
    }, 5000);
  }); */

  /*await lugares.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const lugar = doc.data();
        const marker = new Marker({
            position: { lat: parseFloat(lugar.Lat), lng: parseFloat(lugar.Lng) },
            map,
            title: lugar.Name,
        });

        /*const infowindow = new InfoWindow({
            content: `<h3>${lugar.name}</h3><p>Latitud: ${lugar.Lat}</p><p>Longitud: ${lugar.Lng}</p>`,
        });*/

       /* marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        markers.push(marker);
    })
});*/

  
}

initMap();


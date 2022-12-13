function initMap() {
  //const pr = { lat: 18.2208, lng: -66.5901 }
  const center = { lat: 18.219333, lng: -66.446591}
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center,
  })

  const icons = {
    tree: "http://maps.google.com/mapfiles/ms/micons/tree.png",
    plane: "http://maps.google.com/mapfiles/ms/micons/plane.png",
    water: "http://maps.google.com/mapfiles/ms/micons/water.png",
    hiker: "http://maps.google.com/mapfiles/ms/micons/hiker.png",
    snackBar: "http://maps.google.com/mapfiles/ms/micons/snack_bar.png"
  }

  // const marker = new google.maps.Marker({
  //   title: "Puerto Rico",
  //   position: pr,
  //   map: map,
  // });

  new google.maps.Marker({
    title: "Castillo San Felipe del Morro",
    position: { lat: 18.4706276, lng: -66.1250145 },
    map: map,
  })

  new google.maps.Marker({
    title: "La Perla",
    position: { lat: 18.4689232, lng: -66.1179425 },
    map: map,
  })

  new google.maps.Marker({
    title: "El Yunque",
    position: { lat: 18.3105081, lng: -65.8000288 },
    map: map,
    icon: icons.tree
  })

  new google.maps.Marker({
    title: "Piñones de Carolina (street food)",
    position: { lat: 18.4470453, lng: -65.98101 },
    map: map,
    icon: icons.snackBar
  })

  new google.maps.Marker({
    title: "Luis Munoz Marin International Airport",
    position: { lat: 18.4378347, lng: -66.0078824 },
    map: map,
    icon: icons.plane
  })

  

}

window.initMap = initMap;

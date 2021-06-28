mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FuZWVyIiwiYSI6ImNqbjF4aGV2bjU0b2Qza255ZHRiNXI3bm0ifQ.2dwYxqcqpsTwHwHcVEN25w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/sidhant47/cjn53w043010f2sjqbzaawhci",
  center: [75.730508, 21.257961],
  zoom: 3.0
});

map.on("load", function() {
  var year = [1530, 1605, 1707];

  var geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [76.96872993653636, 29.392304300634095]
        },
        properties: {
          year: 1526,
          title: "First Battle of Panipat",
          description:
            "The First Battle of Panipat, on 21 April 1526, was fought between the invading forces of Babur and the Lodi Kingdom. It took place in north India and marked the beginning of the Mughal Empire."
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [74.13523611034688, 32.71113242252356]
        },
        properties: {
          year: 1527,
          title: "Battle of Khanwa",
          description:
            "The Battle of Khanwa was fought near the village of Khanwa, in Bharatpur District of Rajasthan, on March 17, 1527. It was fought between the invading forces of the first Mughal Emperor Babur and the Rajput forces led by Rana Sanga of Mewar, after the Battle of Panipat."
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [88.572548, 22.108612]
        },
        properties: {
          year: 1576,
          title: "The Battle of Rajmahal",
          description:
            "The Battle of Rajmahal was a battle that took place between the Mughal Empire and the Karrani Dynasty that ruled the Sultanate of Bengal in 1576. The battle resulted in a decisive victory for the Mughals. During the battle, the last Sultan of Bengal, Daud Khan Karrani, was captured and later executed by the Mughals."
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [86.8172, 26.343]
        },
        properties: {
          year: 1671,
          title: "The Battle of Saraighat",
          description:
            "The Battle of Saraighat was the last battle in the last major attempt by the Mughals to extend their empire into Assam. Though the Mughals managed to regain Guwahati briefly after a later Borphukan deserted it, the Ahoms wrested control in the Battle of Itakhuli in 1682 and maintained it till the end of their rule."
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [76.4129, 30.8927]
        },
        properties: {
          year: 1704,
          title: "The Battle of Chamkaur",
          description:
            "The Battle of Chamkaur, also known as Battle of Chamkaur Sahib, was fought between the Khalsa led by Guru Gobind Singh and the Mughal forces led by Wazir Khan. Guru Gobind Singh makes a reference to this battle in his victory letter Zafarnama."
        }
      }
    ]
  };

  geojson.features.forEach(function(marker) {
    var el = document.createElement("div");
    el.className = "marker";

    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            "<h3>" +
              marker.properties.title +
              "</h3><p>" +
              marker.properties.description +
              "</p>"
          )
      )
      .addTo(map);
  });

  map.addLayer({
    id: "collisions",
    type: "fill",
    source: {
      type: "geojson",
      data: "./geojson.json"
    },
    paint: {
      "fill-color": "#731704",
      "fill-opacity": 0.8
    }
  });

  map.setFilter("collisions", ["==", ["number", ["get", "Year"]], year[0]]);

  document.getElementById("slider").addEventListener("input", function(e) {
    var y = parseInt(e.target.value);
    var ye = year[y];

    map.setFilter("collisions", ["<=", ["number", ["get", "Year"]], ye]);

    document.getElementById("active-hour").innerText = ye;
  });
});

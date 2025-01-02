// Example configurations for different maps
let markerDiv;
let leftMargin;
let drawableWidth;

const textDescription = {
  Dose_horizontal: 'This set of maps displays the <em>dose</em>, which is a measure of decay rate, in wood exposed above-ground, as well as the corresponding temporal coefficient of variation.<br><br>  The data represents a very specific case of a horizontal board of norway spruce (<i>Picea abies</i>), with a thickness of 22 mm.<br><br> <b>Layers</b><br><i>Yearly Dose (CERRA)</i>: Yearly average dose, calculated based on the CERRA dataset over 36 years at a resolution of 5.5 km<br> <i>Coefficient of variation: </i>Coefficient of variation of the above<br> <i>Yearly Dose (MET) 3: </i>Yearly average dose, calculated based on 6 years of the MET Nordic dataset with a resolution of 1 km<br><br> Reference & data in <a href="https://doi.org/10.1080/22797254.2024.2443902">Hosseini et al. (preprint)</a>',
  Dose_IG: 'This set of maps displays the <em>dose</em>, which is a measure of decay rate, in wood exposed in-ground, as well as the corresponding temporal coefficient of variation.<br><br>  Some more text here... <br><br> <b>Layers</b><br><i>Yearly Dose (CERRA)</i>: Yearly average dose, calculated based on the ERA-5 dataset over xx years at a resolution of 11 km<br> <i>Coefficient of variation: </i>Coefficient of variation of the above<br> <br><br> Reference & data in <a href="https://doi.org/10.1080/22797254.2024.2443902">Niekerk et al. (2025)</a>',
    Dose_IG_Cold: 'This set of maps displays the number of days in a month when the soil is too cold for any decay to occur. <br><br> Reference & data in <a href="https://doi.org/10.1080/22797254.2024.2443902">Niekerk et al. (2025)</a>',
    Dose_IG_Dry: 'This set of maps displays the number of days in a month when the soil is too dry for any decay to occur. <br><br> Reference & data in <a href="https://doi.org/10.1080/22797254.2024.2443902">Niekerk et al. (2025)</a>',
    Dose_IG_Waterlogged: 'This set of maps displays the number of days in a month when the soil holds too much water (waterlogged) for any decay to occur. <br><br> Reference & data in <a href="https://doi.org/10.1080/22797254.2024.2443902">Niekerk et al. (2025)</a>',    
};


const mapConfigs = {
  CERRA_Dose: {
    imageUrl: '1.png',
    imageBounds: [[20.29, -58.1036],[75.3468,74.1051]],
    minValue: 0,
    maxValue: 165,
    label: 'Yearly Dose',
    layer_name: 'Yearly Dose (CERRA)',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ],
    text: textDescription.Dose_horizontal,
  },
  CERRA_CV: {
    imageUrl: '2.png',
    imageBounds: [[20.29, -58.1036],[75.3468,74.1051]],
    minValue: 0,
    maxValue: 1,
    label: 'CoV',
    layer_name: 'CoV (CERRA)',
    colorStops: [
      [0.0, 'rgba(252, 255, 164, 0.7)'],
      [0.25, 'rgba(222, 73, 104, 0.7)'],
      [0.5, 'rgba(140, 41, 129,  0.7)'],
      [0.75, 'rgba(59, 14, 112, 0.7)'],
      [1.0, 'rgba(0, 0, 4, 0.7)']
    ],
    text: textDescription.Dose_horizontal,
  },
  MET_Dose: {
    imageUrl: '3.png',
    imageBounds: [[52.3025,41.7643],[73.8592,-11.7612]],
    minValue: 0,
    maxValue: 80,
    label: 'Yearly Dose',
    layer_name: 'Yearly Dose (MET)',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ],
    text: textDescription.Dose_horizontal,
  },
  MET_wd_vert: {
    imageUrl: '4.png',
    imageBounds: [[52.3025,41.7643],[73.8592,-11.7612]],
    minValue: 0,
    maxValue: 360,
    label: 'Worst wall orientation (0 ° = east)',
    layer_name: 'Wall orientation',
    colorStops: [
      [0.0, 'rgba(244, 235, 244, 0.7)'],
      [0.167, 'rgba(123, 161, 194, 0.7)'],
      [0.33, 'rgba(94, 68, 165, 0.7)'],
      [0.5, 'rgba(34, 6, 41, 0.7)'],
      [0.667, 'rgba(142, 44, 80, 0.7)'],
      [0.833, 'rgba(198, 138, 109, 0.7)'],
      [1, 'rgba(244, 235, 244, 0.7)']
    ]
  },
  MET_Dose_vert: {
    imageUrl: '5.png',
    imageBounds: [[52.3025,41.7643],[73.8592,-11.7612]],
    minValue: 0,
    maxValue: 67,
    label: 'Yearly Dose (2014-2020)',
    layer_name: 'Yearly Dose MET',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ]
  },
  Soil_Dose: {
    imageUrl: 'soil1.png',
    imageBounds: [[30, -14.9],[79.9,50]],
    minValue: 0,
    maxValue: 140,
    label: 'Yearly Dose',
    layer_name: 'Yearly Dose',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ],
    text: textDescription.Dose_IG,
  },
  Soil_Dose_CV: {
    imageUrl: 'soil3.png',
    imageBounds: [[30, -14.9],[79.9,50]],
    minValue: 0,
    maxValue: 1,
    label: 'Coefficient of variation',
    layer_name: 'Coefff',
    colorStops: [
      [0.0, 'rgba(252, 255, 164, 0.7)'],
      [0.25, 'rgba(222, 73, 104, 0.7)'],
      [0.5, 'rgba(140, 41, 129,  0.7)'],
      [0.75, 'rgba(59, 14, 112, 0.7)'],
      [1.0, 'rgba(0, 0, 4, 0.7)']
    ],
    text: textDescription.Dose_IG,
  },
  Soil_cold1: {
    imageUrl: 'soil_cold1.png',
    imageBounds: [[30, -14.9],[79.9,50]],
    minValue: 0,
    maxValue: 31,
    label: 'Days cold',
    layer_name: 'Days cold',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ],
    text: textDescription.Dose_IG_Cold,
  },
  Soil_dry1: {
    imageUrl: 'soil_dry1.png',
    imageBounds: [[30, -14.9],[79.9,50]],
    minValue: 0,
    maxValue: 31,
    label: 'Days dry',
    layer_name: 'Days dry',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ],
    text: textDescription.Dose_IG_Dry,
  },
  Soil_waterlogged1: {
    imageUrl: 'soil_waterlogged1.png',
    imageBounds: [[30, -14.9],[79.9,50]],
    minValue: 0,
    maxValue: 31,
    label: 'Days waterlogged',
    layer_name: 'Days waterlogged',
    colorStops: [
      [0.0, 'rgba(68, 1, 84, 0.7)'],
      [0.125, 'rgba(72, 39, 119, 0.7)'],
      [0.25, 'rgba(63, 74, 138, 0.7)'],
      [0.375, 'rgba(49, 103, 142, 0.7)'],
      [0.5, 'rgba(38, 131, 143, 0.7)'],
      [0.625, 'rgba(31, 157, 138, 0.7)'],
      [0.75, 'rgba(108, 206, 90, 0.7)'],
      [0.875, 'rgba(182, 222, 43, 0.7)'],
      [1.0, 'rgba(254, 232, 37, 0.7)']
    ],
    text: textDescription.Dose_IG_Waterlogged,
  }
};

//add some 
SequencesNames = ['Soil_cold1','Soil_dry1','Soil_waterlogged1']
monthNames = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

for (let j = 0; j<SequencesNames.length;j++) {
  for (let i = 1; i < 13; i++) {
    let str = mapConfigs[SequencesNames[j]].imageUrl;
    const index = str.length - 5;
    str = str.substring(0, index) + i + str.substring(index + 1); 
    const newObj = { ...mapConfigs[SequencesNames[j]]}; // shallow clone
    newObj.imageUrl = str;
    newObj.layer_name = monthNames[i-1]
    mapConfigs[SequencesNames[j].substring(0,SequencesNames[j].length-1) + i] = newObj;
  }
}

// Groups that will appear in a radio toggle
const mapGroups = {
  cerraGroup: ['CERRA_Dose', 'CERRA_CV','MET_Dose'],
  metGroup: ['MET_Dose_vert', 'MET_wd_vert'],
  soilGroup: ['Soil_Dose', 'Soil_Dose_CV'],
  soilColdGroup: Array.from({ length: 12 }, (_, i) => `Soil_cold${i + 1}`),
  soilWaterloggedGroup: Array.from({ length: 12 }, (_, i) => `Soil_waterlogged${i + 1}`),
  soilDryGroup: Array.from({ length: 12 }, (_, i) => `Soil_dry${i + 1}`)
};

// store references to various Leaflet objects
let baseTile;             // the base tile layer
let layerControl = null;  // the radio-layer control
let colorBarControl = null;
let selectedMap = null;   // the current map key (string)



// CREATE THE LEAFLET MAP

const map = L.map('map', { doubleClickZoom: false }).setView([0,0], 2);
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
baseTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 7,
  attribution: '©OpenStreetMap, ©CartoDB'
}).addTo(map);
var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels'
}).addTo(map);
//L.control.zoom({
//  position: 'bottomright'
//}).addTo(map);
map.zoomControl.remove();

function createDynamicLayerControl(groupKey, defaultMapKey) {
  // Remove old control if any
  if (layerControl) {
    map.removeControl(layerControl);
    layerControl = null;
  }

  // Build baseLayers => each item becomes a radio button
  const baseLayers = {};
  mapGroups[groupKey].forEach(mKey => {
    const cfg = mapConfigs[mKey];
    const label = cfg.layer_name || mKey;
    const overlay = L.imageOverlay(cfg.imageUrl, cfg.imageBounds, {
      crossOrigin: true,
      interactive: true
    });
    overlay._mapConfigKey = mKey;
    baseLayers[label] = overlay;
  });

  // Decide which mapKey is default
  let chosenKey = defaultMapKey && mapGroups[groupKey].includes(defaultMapKey)
    ? defaultMapKey
    : mapGroups[groupKey][0];  // fallback: first in array
  const chosenLabel = mapConfigs[chosenKey].layer_name || chosenKey;

  // 1) Add the chosen overlay to the map so that radio button is pre-checked
  map.addLayer(baseLayers[chosenLabel]);

  // 2) Create the layer control (radio toggles)
  layerControl = L.control.layers(baseLayers, {}, { collapsed: false}).addTo(map);

  // 3) Update color bar, etc.
  updateMapSelection(chosenKey);
}


//LISTEN TO BASELAYERCHANGE => UPDATE UI
map.on('baselayerchange', function(e) {
  const newKey = e.layer._mapConfigKey;
  if (newKey) {
    updateMapSelection(newKey);
  }
});


// updateMapSelection => set colorbar, text, etc.

function updateMapSelection(mapKey) {
  selectedMap = mapKey;
  const config = mapConfigs[mapKey];
  if (!config) return;

  // Remove old color bar
  if (colorBarControl) {
    map.removeControl(colorBarControl);
    colorBarControl = null;
  }

  // Add new color bar
  colorBarControl = new CustomColorBarControl({
    position: 'bottomleft',
    minValue: config.minValue,
    maxValue: config.maxValue,
    label: config.label,
    colorStops: config.colorStops
  });
  map.addControl(colorBarControl);

  // Update description text
  const textDiv = document.getElementById('mapInfo');
  textDiv.innerHTML = config.text || '';

  // Find the currently active overlay on the map
  const overlay = findActiveOverlay();
  if (!overlay) return;

  // Attach getColor logic, etc.
  overlay.getColor = function(latlng) {
    try {
      const p = this._map.latLngToLayerPoint(latlng);
      const o = L.DomUtil.getPosition(this._image);
      const w = parseInt(this._image.style.width.replace('px',''));
      const h = parseInt(this._image.style.height.replace('px',''));

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const context = canvas.getContext('2d');
      context.drawImage(this._image, 0, 0, w, h);
      return context.getImageData(p.x - o.x, p.y - o.y, 1, 1).data;
    } catch(e) {
      console.error(e);
      return null;
    }
  };

  const grayscaleStops = createGrayscaleStops(config.colorStops);

  // Listen to mousemove
  overlay.on('mousemove', function(e) {
    const a = this.getColor(e.latlng);
    if (a !== null) {
      var hex = '#' + (0x1000000 + (a[0]<<16) + (a[1]<<8) + a[2]).toString(16).substr(1);
      let hex1 = hex.startsWith('#') ? hex.slice(1) : hex;
      const r = parseInt(hex1.substring(0,2),16);
      const g = parseInt(hex1.substring(2,4),16);
      const b = parseInt(hex1.substring(4,6),16);
      const gray = Math.round(0.299*r + 0.587*g + 0.114*b);
      const v = interpolateGray(grayscaleStops, gray);
      const xPos = v * drawableWidth + 20;
      markerDiv.style.left = xPos + 'px';
    }
  });
}


// findActiveOverlay => whichever overlay is on the map

function findActiveOverlay() {
  let found = null;
  map.eachLayer(layer => {
    if (layer instanceof L.ImageOverlay && layer._mapConfigKey === selectedMap) {
      found = layer;
    }
  });
  return found;
}


// COLOR BAR IMPLEMENTATION
function drawColorBar(canvas, colorStops, minValue, maxValue, nTicks, colorBarLabel) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  leftMargin = 20;
  const rightMargin = 20;
  const topMargin = 20;
  const barHeight = 20;

  // Title
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#000';
  ctx.fillText(colorBarLabel, width / 2, 5);

  // Gradient bar
  const barY = topMargin;
  drawableWidth = width - leftMargin - rightMargin;
  const gradient = ctx.createLinearGradient(leftMargin, barY, leftMargin + drawableWidth, barY);
  colorStops.forEach(([offset, color]) => {
    gradient.addColorStop(offset, color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(leftMargin, barY, drawableWidth, barHeight);

  // Ticks
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = '10px sans-serif';

  const valueRange = maxValue - minValue;
  const tickLength = 6;
  const tickBaseY = barY + barHeight;

  for (let i = 0; i < nTicks; i++) {
    const t = i / (nTicks - 1);
    const x = leftMargin + t * drawableWidth;
    const val = minValue + t * valueRange;

    ctx.beginPath();
    ctx.moveTo(x, tickBaseY);
    ctx.lineTo(x, tickBaseY + tickLength);
    ctx.stroke();
    ctx.fillText(val.toFixed(2), x, tickBaseY + tickLength + 2);
  }

  const container = canvas.parentNode; 
  markerDiv = L.DomUtil.create('div', 'colorbar-marker', container);
  markerDiv.style.position = 'absolute';
  markerDiv.style.width = '0px';
  markerDiv.style.height = '0px';
  markerDiv.style.borderLeft = '6px solid transparent';
  markerDiv.style.borderRight = '6px solid transparent';
  markerDiv.style.borderTop = '10px solid red';
  markerDiv.style.top = topMargin + 'px';
  markerDiv.style.left = 20 + drawableWidth + 'px';
}

const CustomColorBarControl = L.Control.extend({
  initialize: function(options) {
    L.Util.setOptions(this, options);
  },
  onAdd: function(map) {
    const container = L.DomUtil.create('div', 'colorbar-control');
    const canvas = L.DomUtil.create('canvas', '', container);
    canvas.width = 250;  
    canvas.height = 70; 

    drawColorBar(
      canvas,
      this.options.colorStops,
      this.options.minValue,
      this.options.maxValue,
      5,
      this.options.label
    );

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    return container;
  }
});


//COLOR UTILS
function parseRGBAColor(rgbaStr) {
  const m = rgbaStr.match(/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/);
  if (!m) throw new Error('Invalid RGBA format: ' + rgbaStr);
  return [
    parseInt(m[1], 10),
    parseInt(m[2], 10),
    parseInt(m[3], 10),
    parseFloat(m[4])
  ];
}

function rgbToGray(r, g, b) {
  return Math.round(0.299*r + 0.587*g + 0.114*b);
}

function createGrayscaleStops(colorStops) {
  return colorStops.map(([offset, color]) => {
    const [r, g, b, a] = parseRGBAColor(color);
    const gray = rgbToGray(r, g, b);
    return [offset, gray];
  });
}

function interpolateGray(grayscaleStops, gray) {
  for (let i = 0; i < grayscaleStops.length - 1; i++) {
    const [o1, g1] = grayscaleStops[i];
    const [o2, g2] = grayscaleStops[i+1];
    if ((gray >= g1 && gray <= g2) || (gray >= g2 && gray <= g1)) {
      const t = (gray - g1) / (g2 - g1);
      return (o1 + t * (o2 - o1));
    }
  }
  return grayscaleStops[grayscaleStops.length - 1][1];
}


//DROPDOWN => LOAD GROUP

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mapSelector').addEventListener('change', function() {
    const chosen = this.value;

    // Remove old layer control
    if (layerControl) {
      map.removeControl(layerControl);
      layerControl = null;
    }

    // Remove all non–tile layers
    map.eachLayer(layer => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    // Check if 'chosen' is in a group => radio toggles
    let foundGroup = null;
    for (const gKey in mapGroups) {
      if (mapGroups[gKey].includes(chosen)) {
        foundGroup = gKey;
        break;
      }
    }

    if (foundGroup) {
      // create a dynamic layer control
      createDynamicLayerControl(foundGroup, chosen);
    } else {
      // treat it as a single/standalone overlay
      const cfg = mapConfigs[chosen];
      if (!cfg) return; // guard

      // create & add
      const overlay = L.imageOverlay(cfg.imageUrl, cfg.imageBounds, {
        crossOrigin: true,
        interactive: true
      });
      overlay._mapConfigKey = chosen;
      overlay.addTo(map);

      // update colorbar, text
      updateMapSelection(chosen);
    }
  });
});

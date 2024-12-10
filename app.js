// Example configurations for different maps
let markerDiv
let leftMargin
let drawableWidth

const mapConfigs = {
    map1: {
      imageUrl: '1.png',
      imageBounds: [[20.29, -58.1036],[75.3468,74.1051]],
      minValue: 0,
      maxValue: 165,
      label: 'Yearly Dose',
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
    map2: {
      imageUrl: 'CoV.png',
      imageBounds: [[52.3025, -11.7612],[73.8592, 41.7643]],
      minValue: 0,
      maxValue: 1.5,
      label: 'Coefficient of variation',
      colorStops: [
        [0.0, '#000004'],
        [0.25, '#3b0f70'],
        [0.5, '#8c2981'],
        [0.75, '#de4968'],
        [1.0, '#fcffa4']
      ]
    },
    map3: {
      imageUrl: '2.png',
      imageBounds: [[52.3025,41.7643],[73.8592,-11.7612]],
      minValue: 0,
      maxValue: 80,
      label: 'Yearly Dose (2014-2020)',
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
    }
  };
  
  // Create the map and set the view
  var map = L.map('map').setView([0, 0], 2);
  
  // Add a base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  let imageOverlay = null;
  let colorBarControl = null;
  
  function drawColorBar(canvas, colorStops, minValue, maxValue, nTicks, colorBarLabel) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
  
    leftMargin = 20;
    const rightMargin = 20;
    const topMargin = 20;
    const barHeight = 20;
  
    // Label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#000';
    ctx.fillText(colorBarLabel, width / 2, 5);
  
    // Colorbar
    const barY = topMargin;
    drawableWidth = width - leftMargin - rightMargin;
    const gradient = ctx.createLinearGradient(leftMargin, barY, leftMargin + drawableWidth, barY);
    colorStops.forEach(([offset, color]) => {
      gradient.addColorStop(offset, color);

      /////////////////////////
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
      const value = minValue + t * valueRange;
  
      ctx.beginPath();
      ctx.moveTo(x, tickBaseY);
      ctx.lineTo(x, tickBaseY + tickLength);
      ctx.stroke();
  
      const label = value.toFixed(2);
      ctx.fillText(label, x, tickBaseY + tickLength + 2);
    }

    const container = canvas.parentNode; 
    markerDiv = L.DomUtil.create('div', 'colorbar-marker', container);
    markerDiv.style.position = 'absolute';
    markerDiv.style.width = '0px';
    markerDiv.style.height = '0px';
    markerDiv.style.borderLeft = '6px solid transparent';
    markerDiv.style.borderRight = '6px solid transparent';
    markerDiv.style.borderTop = '10px solid red';
    markerDiv.style.top = (topMargin - 0) + 'px'; // Place it slightly above the bar
    markerDiv.style.left = 20 + drawableWidth + 'px'
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
  
      // Use the colorStops from the options passed in
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
  

  
  function updateMapSelection(mapKey) {
    const config = mapConfigs[mapKey];
  
    // Remove old image overlay if exists
    if (imageOverlay) {
      map.removeLayer(imageOverlay);
    }
  
    // Add the new image overlay
    imageOverlay = L.imageOverlay(config.imageUrl, config.imageBounds,{
        crossOrigin: true,
        interactive: true
      }).addTo(map);
    map.fitBounds(config.imageBounds);
  
    // Update the colorbar by removing old control and adding a new one
    if (colorBarControl) {
      map.removeControl(colorBarControl);
    }
  
    colorBarControl = new CustomColorBarControl({
      position: 'bottomright',
      minValue: config.minValue,
      maxValue: config.maxValue,
      label: config.label,
      colorStops: config.colorStops // Pass the colormap here
    });
  
    map.addControl(colorBarControl);

    //get a grayscale colorbar to interpolate values
    const grayscaleStops = createGrayscaleStops(config.colorStops);
    console.log(grayscaleStops);

    imageOverlay.getColor = function(latlng) {
        try {
          const p = this._map.latLngToLayerPoint(latlng);
          const o = L.DomUtil.getPosition(this._image);
          const w = parseInt(this._image.style.width.replace("px", ""));
          const h = parseInt(this._image.style.height.replace("px", ""));
    
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const context = canvas.getContext("2d");
          context.drawImage(this._image, 0, 0, w, h);
          return context.getImageData(p.x - o.x, p.y - o.y, 1, 1).data;
        } catch (e) {
          console.error(e);
          return null;
        }
      };
    
      imageOverlay.on("mousemove", function(e) {
        
        const a = this.getColor(e.latlng);
        if (a !== null) {
          var hex = "#" + (0x1000000 + (a[0] << 16) + (a[1] << 8) + a[2]).toString(16).substr(1);
          if (hex.startsWith('#')) {
            hex1 = hex.slice(1);
          }
          console.log(grayscaleStops)
          // Parse the r, g, b values (assuming it's a 6-digit hex)
          const r = parseInt(hex1.substring(0, 2), 16);
          const g = parseInt(hex1.substring(2, 4), 16);
          const b = parseInt(hex1.substring(4, 6), 16);
          const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

          const v = interpolateGray(grayscaleStops, gray)

          console.log(v)
          
          const xPos = v * drawableWidth + 20;
          markerDiv.style.left = xPos + 'px';


        }
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateMapSelection('map1');
  
    document.getElementById('mapSelector').addEventListener('change', function() {
      const selectedMap = this.value;
      updateMapSelection(selectedMap);
    });
  });

 


  //////////////////////////////////////////////


  function parseRGBAColor(rgbaStr) {
    // Expected format: 'rgba(r, g, b, a)'
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
    // Weighted luminance
    return Math.round(0.299*r + 0.587*g + 0.114*b);
  }
  
  function createGrayscaleStops(colorStops) {
    return colorStops.map(([offset, color]) => {
      const [r, g, b, a] = parseRGBAColor(color);
      const gray = rgbToGray(r, g, b);
      // Create a grayscale color, still using the alpha channel
      // Since it's grayscale, r=g=b=gray
      const grayColor = gray;
      return [offset, grayColor];
    });
  }
  

  function interpolateGray(grayscaleStops, gray) {
    // Clamp gray to [0,1]
    //gray = Math.max(0, Math.min(1, gray));
    
    // Find the stops that gray falls between
    let i;
    for (i = 0; i < grayscaleStops.length - 1; i++) {
      const [o1, g1] = grayscaleStops[i];
      const [o2, g2] = grayscaleStops[i+1];
      
      if (gray >= g1 && gray <= g2) {
        // Found our bracket
        const t = (gray - g1) / (g2 - g1);  
        // Linear interpolation of grayscale
        return (o1 + t * (o2 - o1));
      }
    }
  
    // If we didn't find it in the loop (e.g., gray == 1),
    // just return the last stop's grayscale
    return grayscaleStops[grayscaleStops.length - 1][1];
  }
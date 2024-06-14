document.addEventListener('DOMContentLoaded', () => {

  const width = 1300;
  const height = 1100;

  const svg = d3.select('#tree-map-container')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);    

  const drawTreeMap = () => {
    const hierarchy = d3.hierarchy(gameData, (d) => d.children)
                        .sum((d) => d.value)
                        .sort((a, b) => b.value - a.value);

    const createTreeMap = d3.treemap()
                            .size([1300, 1100]);

    createTreeMap(hierarchy);

    const gameTiles = hierarchy.leaves();
    let categories = gameTiles.map((nodes) => nodes.data.category);
    categories = categories.filter((category, index, self) => self.indexOf(category) === index); 

    const tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('opacity', 0);
    
    const handleMouseover = (event, d) => {
      const mouseX = event.pageX;
      const mouseY = event.pageY;
      const dataName = d.data.name;
      const dataCategory = d.data.category;
      const dataVal = d.data.value;
      tooltip.style('opacity', 0.9)
              .style('left', mouseX + 50 + 'px')
              .style('top', mouseY + 'px')
              .attr('data-value', (d) => dataVal);
      tooltip.html(
        'Name: ' + dataName + '<br/>' +
        'Platform: ' + dataCategory + '<br/>' +
        'Value: ' + dataVal + ' Million'
      )        
    }

    const handleMouseout = () => {
      tooltip.style('opacity', 0);
    }

    const section = svg.selectAll('g')
                            .data(gameTiles)
                            .enter()
                            .append('g')
                            .attr('transform', (d) => 'translate(' + d.x0 + ', ' + d.y0 + ')');

    section.append('rect')
            .attr('class', 'tile')
            .attr('fill', (d) => {
              const category = d.data.category;
              let color;
              switch (category) {
                case 'Wii':
                  color = '#4c92c3';
                  break;
                case 'DS':
                  color = '#bed2ed';
                  break;
                case 'X360':
                  color = '#ff993e';
                  break;
                case 'GB':
                  color = '#ffc993';
                  break;
                case 'PS3':
                  color = '#56b356';
                  break;
                case 'NES':
                  color = '#ade5a1';
                  break;
                case 'PS2':
                  color = '#de5253';
                  break;
                case '3DS':
                  color = '#ffadab';
                  break;
                case 'PS4':
                  color = '#a985ca';
                  break;
                case 'SNES':
                  color = '#d1c0dd';
                  break;
                case 'PS':
                  color = '#a3786f';
                  break;
                case 'N64':
                  color = '#d0b0a9';
                  break;
                case 'GBA':
                  color = '#e992ce';
                  break;
                case 'XB':
                  color = '#f9c5db';
                  break;
                case 'PC':
                  color = '#999999';
                  break;
                case '2600':
                  color = '#d2d2d2';
                  break;
                case 'PSP':
                  color = '#c9ca4e';
                  break;
                case 'XOne':
                  color = '#e2e2a4';    
              }
              return color;
            })
            .attr('data-name', (d) => d.data.name)
            .attr('data-category', (d) => d.data.category)
            .attr('data-value', (d) => d.data.value)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr('stroke', '#28367e')
            .style('cursor', 'pointer')
            .on('mouseover', handleMouseover)
            .on('mouseout', handleMouseout);

    section.append('text')
            .selectAll('tspan')
            .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
            .enter()
            .append('tspan')
            .text((d) => d)
            .attr('x', 3)
            .attr('y', (d, i) => 13 + i * 11)
            .style('font-size', 10 + 'px');  

    const legend = d3.select('#legend')
                      .append('svg')
                      .attr('width', width)
                      .attr('height', 100)
                      .style('padding-left', 60 + 'px')
                      .style('padding-top', 10 + 'px');

    const rectSize = 20;                  
    const rectHSpacing = 110;   
    const rectVSpacing = 20;              
    const elementsPerRow = Math.floor(width / rectHSpacing);

    const legendItem = legend.selectAll('g')
                        .data(categories)
                        .enter()
                        .append('g')
                        .attr('transform', (d, i) => {
                          return (
                            'translate(' + (i % elementsPerRow) * rectHSpacing + ', ' +
                            (Math.floor(i / elementsPerRow) * rectSize + rectVSpacing *
                            Math.floor(i / elementsPerRow)) + ')'
                          )
                        });

    legendItem.append('rect')
        .attr('width', rectSize)
        .attr('height', rectSize)                              
        .attr('class', 'legend-item')                  
        .attr('fill', (d) => {
          let color;
          switch (d) {
            case 'Wii':
              color = '#4c92c3';
              break;
            case 'DS':
              color = '#bed2ed';
              break;
            case 'X360':
              color = '#ff993e';
              break;
            case 'GB':
              color = '#ffc993';
              break;
            case 'PS3':
              color = '#56b356';
              break;
            case 'NES':
              color = '#ade5a1';
              break;
            case 'PS2':
              color = '#de5253';
              break;
            case '3DS':
              color = '#ffadab';
              break;
            case 'PS4':
              color = '#a985ca';
              break;
            case 'SNES':
              color = '#d1c0dd';
              break;
            case 'PS':
              color = '#a3786f';
              break;
            case 'N64':
              color = '#d0b0a9';
              break;
            case 'GBA':
              color = '#e992ce';
              break;
            case 'XB':
              color = '#f9c5db';
              break;
            case 'PC':
              color = '#999999';
              break;
            case '2600':
              color = '#d2d2d2';
              break;
            case 'PSP':
              color = '#c9ca4e';
              break;
            case 'XOne':
              color = '#e2e2a4';    
          }
          return color;
        });

    legendItem.append('text')
        .attr('x', rectSize + 6)
        .attr('y', rectSize - 6)
        .style('font-size', 12 + 'px')
        .text((d) => d);            
        
  }

  const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

  let gameData;

  d3.json(url).then(
    (data, error) => {
      if (error) {
        console.log(error);
      } else {
        gameData = data;
        drawTreeMap();
      }
    }
  )

});

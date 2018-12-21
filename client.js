import {ReactInstance,Surface,Location} from 'react-360-web';


function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  const controlPanel = new Surface(1000, 600, Surface.SurfaceShape.Flat);
  controlPanel.setAngle(0, -0.4);

  const commentPanel = new Surface(1000, 600, Surface.SurfaceShape.Flat);
  commentPanel.setAngle(-0.4, 0);

  const location = new Location([-3, 2, -5], [0, -Math.PI/14, 0, -Math.PI/8]);

  const photoData = [
    {uri: './static_assets/square.jpg', thumb:'thumb_square.jpg',title: 'Square Ebara', format: '2D', comment_img:'comment_square_ebara.png'},
    {uri: './static_assets/toyosu.jpg', thumb:'thumb_toyosu.jpg', title: 'Toyosu Center Bldg.', format: '2D', comment_img:'comment_toyosu.png'},
    {uri: './static_assets/mountain.jpg', thumb:'thumb_mountain.jpg',title: 'Grand Canyon', format: '2D', comment_img:'comment_grand_canyon.png'},
    {uri: './static_assets/garden.jpg', thumb:'thumb_garden.jpg',title: 'Great Valley', format: '2D', comment_img:'comment_great_valley.png'},
    // Add your own 180 / 360 photos to this array,
    // with an associated title and format  
  ]
  r360.renderToSurface(
    r360.createRoot('Slideshow', {
      photos: photoData,
    }),
    controlPanel,
  );
  /*r360.renderToSurface(
    r360.createRoot('Comment',{
      photos: photoData,
    }),
    commentPanel,
  );*/

  r360.renderToLocation(
    r360.createRoot('Comment',{
      photos: photoData,
    }),
    location,
  );
}

window.React360 = {init};

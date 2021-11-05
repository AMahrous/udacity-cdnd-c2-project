import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
//import isImageURL from 'image-url-validator';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/filteredimage", async ( req, res ) => {
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400).send(`Please insert a url...!`);
    }


    const extension:string = image_url.toString().substring(image_url.length-4);
    console.log(`
      url:
      ${image_url}
      extension:
      ${extension}`);
    
    if(extension === '.jpg' || extension === '.png' || extension === '.jpeg' || extension === '.pgm')
    {
      const filteredImage = (await filterImageFromURL(image_url));
      
      return res.status(200).sendFile(filteredImage, function (err) {
        if (err) {
          console.log('Error!');
        } else {
            console.log('Sent');
            const localFiles = [filteredImage];
            deleteLocalFiles(localFiles);
        }});
      
    }
    else
    {
      return res.status(400).send(`Not a valid image url:
      ${image_url}`);
    }


  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
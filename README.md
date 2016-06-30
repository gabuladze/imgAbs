# imgAbs
Image Search Abstraction Layer (API project for Free Code Camp)

## User Stories:
1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

### Usage:
- Go to ```https://imgabs.herokuapp.com/imagesearch/SEARCHTERM``` to get results.
- Use ```?offset=NUM``` to paginate results: ```https://imgabs.herokuapp.com/imagesearch/SEARCHTERM?offset=2```.
- Go to ```https://imgabs.herokuapp.com/imagesearch``` to get a list of the most recently submitted search strings.

### Environment variables used:
1. ```API_KEY``` - Key that you can get from console.developers.google.com.
2. ```ENGINE_ID``` - Your custom Google search engine ID.
3. ```MONGOLAB_URI``` - Your MongoLab DB URI.

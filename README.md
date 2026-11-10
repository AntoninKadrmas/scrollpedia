# The Scrollpedia

Web app build around [edgechat.ai/api](https://www.edgechat.ai/developers) wich offers a lot of articles in markdown format. App lets user to swipe to explore new articles read articles in app, search for articles or filer the search and feed by category, and save favorite articles.

## Set up

For the local development firstly clone the rope to your own machine:

```bash
git clone https://github.com/AntoninKadrmas/scrollpedia.git
```

next install dependencies

```bash
pnpm run install
```

for the local development you can start a server on localhost:5173 by

```
pnpm run dev
```

you can access the local environment on this url: [scrollpedia](http://localhost:5173/scrollpedia/)


to build the project you can use

```
pnpm run build
```

As I am using the typescript in the project so there would be less debugging because incorrectly access non existing parameter i need to obtain the types and I used this [tool](https://transform.tools/json-to-typescript) to generate typescript types from the json response.

## Deploy to github pages

There is an automated script that suing the package `gh-pages` to deploy the builded application in `dist` to the github pages specified in the package.json homepage argument. 

```
pnpm run deploy
```

Using this [article](https://levelup.gitconnected.com/deploy-your-vite-app-to-github-pages-a-lazy-devs-guide-37b0b472fa35) I have set up the github pages.

you can access the pages on this url: [scrollpedia](https://antoninkadrmas.github.io/scrollpedia/)

## UI components

Besides my own components I used also already existed components. One component from shadcn registry [ascii component](https://asciicn.sumak.dev/docs/components). From there I imported the ascii avatar. I needed to initialize the support for shadcn/ui in this project so the avatar works correctly. 

Another component used in the feed interaction is [carousel component](https://www.embla-carousel.com/). There I build up on the y scroll example.

The gradient used in the app I got inspired while checking this [site](https://backseasy.com/).
 
For the different icons I used [lucide icons](https://lucide.dev/).

## API used

For the project I decided to use the:

[Edgepedia API](https://www.edgechat.ai/developers)
*More than 500,000 encyclopedia articles and constantly growing, as JSON. Free. No key, no sign-up. Commercial use with credit. AI training open to everyone.*

| route | description |
|-------|-------------|
| [/random](www.edgechat.ai/api/v1/random) | endpoint used on the feed component to discover new random articles |
| [/search](www.edgechat.ai/api/v1/search?q=koala) | endpoint to search any custom article |
| [/topic](www.edgechat.ai/api/v1/topics) | endpoint to filter random and search articles by the different topics |
| [/articles](www.edgechat.ai/api/v1/articles/koala) | endpoint to get more info about the article and for the markdown wich is than displayed for the user to read |

## User manual

App is used by swiping from bottom of the screen up to access next articles. If you refresh new articles should be fetched but the app will forget those that have been already fetched so the same one could appear (until the reload no article once showed should be filtered out while fetching new random). 

Use search button to search for article or to choose the topic. When topic (subtopic) is selected feed and search functionality is in that topic field.

You can read more on article to get on page with its content. Each article can be saved into favorite. The favorites articles would not disappear after refresh. By the button on the right side of the search button can be accessed the favorite articles.

The popover from search or favorite can be closed by clicking on X button in right top corner. Or on bigger displays by clicking on the dark overlay outside of the gradient overlay.

Use the navigation in app if you do not want the fetched article feed to be reloaded.
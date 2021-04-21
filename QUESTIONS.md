### What would you add to your solution if you had more time?
* It would be interesting to investigate how cypress can intercept/mock websocket calls. Doesn't have built in mechanism for that. Perhaps it would be possible to do with stubs, but it needs more investigation. That would certainly improve the testing coverage surface. 
* I would add a design system. It could be tailwind or material design
* I would add style isolation. Currently, the global css class names are used. It would be nice to use something like styled components or jss.

### What would you have done differently if you knew this page was going to get thousands of views per second vs per week?
From the frontend architecture, I wouldn't change that much really. The amount of page entries doesn't make impact on frontend coding style.
Given the bundle is hosted on the CDN the developers don't have to worry about the amount of traffic. 
On the other hand the amount of the websocket connections would increase significantly. This will will cause a strain on the backend service,
But distributing that traffic between workers should be transparent to the frontend.

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
I really like Optional Chaining feature of Typescript. 
I used it in the project. [here](https://github.com/adamgajzlerowicz/adam-websocket/blob/f826502c5b81a87c20a9c30250b7347683506d3e/src/components/app.tsx#L28)

```
if (data?.asks?.length > 0) {
  setAsks(data.asks.filter(filterItemsWithNoSize))
}
```
This way I don't need to check the nullability of the data, but access deeply nested elements.

### How would you track down a performance issue in production? Have you ever had to do this?
From the frontend perspective, I was debugging issues, where state of the form was too high up. Due to increasing amount of inputs
it would take a long time to re-render the entire form, causing ui Locking on keyboard press.
I also had issues with too much data being rendered and used viewport renderers to decrease amount of data being rendered at once.
The React component inspector is really helpful narrowing issues like that down.

### Can you describe common security concerns to consider for a frontend developer?
Assuming that a website requires a login to access it.

### How would you improve the public API that you just used?
It feels that the endpoint is highly specialized. I would be curious to see how similar or different
it is to the other endpoints and ensure they share similar response structure.

Currently, the logic is partly dispersed between the backend and the frontend, so
I would consider returning the "total" value from the backend.
This will mean that more processing power is required on the backend, but I don't think it should be an issue.
This will also mean that the api is the only source of truth and if logic changes are required, 
only the backend needs to change.

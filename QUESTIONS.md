### What would you add to your solution if you had more time?
* It would be interesting to investigate how cypress can intercept/mock websocket calls. Doesn't have built in mechanism for that. Perhaps it would be possible to do with stubs, but it needs more investigation. That would certainly improve the testing coverage surface. 
* I would add a design system. It could be tailwind or material design
* I would add style isolation. Currently, the global css class names are used. It would be nice to use something like styled components or jss.
* It would be nice to see better eslint with prettier and editorconfig added.
* I would extract the url to an env variable

### What would you have done differently if you knew this page was going to get thousands of views per second vs per week?
From the frontend architecture perspective, I'd make sure that the bundle is hosted on a CDN and is available for all users in either case.
With amount of traffic in mind - I would not change the frontend codebase all that much really, 
as the amount of page entries do not make impact on frontend performance.
Saying that, as the application scales up, the amount of the websocket connections would increase significantly. 
This will cause a strain on the backend service but having a load balancer distributing that traffic between workers, 
should remain transparent to the frontend application.

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
I really like Optional Chaining feature of Typescript. 
I used it also in this project. [here](https://github.com/adamgajzlerowicz/adam-websocket/blob/f826502c5b81a87c20a9c30250b7347683506d3e/src/components/app.tsx#L28)

```
if (data?.asks?.length > 0) {
  setAsks(data.asks.filter(filterItemsWithNoSize))
}
```
This way I don't need to check the existence and type of the data, but simply access deeply nested elements.

### How would you track down a performance issue in production? Have you ever had to do this?
From the frontend perspective, I was debugging issues, where state of the form was lifter too high up. Due to increasing amount of inputs
it would take a long time to re-render the entire form, causing locking of the ui on each keyboard button press.
I also had issues with too much data being rendered and used viewport renderers to decrease amount of data being rendered at once.
The React component inspector is really helpful narrowing issues like that down.

### Can you describe common security concerns to consider for a frontend developer?
One of the main priorities is to protect user's authorization token. If the token was to be stolen, the attacker can
perform operations as that user. One of the ways to remedy that is to use two-factor authentication. Even
if the token leaks, the attacker won't be able to perform sensitive operations. It is also very important to make sure that 
the token does have an short expiry time.

Other way that attacker could perform harmful operations would be a xss attack. The injection of a malicious script means that 
the attacker could perform actions on behalf of a user that are based on that user's session. Xss attqack could also result in a stolen token.


### How would you improve the public API that you just used?
It feels that the endpoint is highly specialized. I would be curious to see how similar or different
it is to the other endpoints and ensure they share similar response structure.

Currently, the logic is partly split between the backend and the frontend, so
I would consider returning the "total" value from the backend.
This will require more processing power used by the backend. This extra calculation happens on the client at the moment.
But this would also mean that the api is the only source of truth and, if any logic changes are required later, only the backend needs to change.

import{j as e}from"./index-Dno8zT30.js";function t(n){const i={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h1,{id:"what-i-helped-do",children:"What I helped do:"}),`
`,e.jsx(i.p,{children:"Make a backend service modernizing OnX maps approach to file imports. This had the following key impacts:"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Impact Name"}),e.jsx(i.th,{children:"Previous Metric"}),e.jsx(i.th,{children:"New Metric"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Complile Time"}),e.jsx(i.td,{children:"~20 mins"}),e.jsx(i.td,{children:"~40 secs"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Code Coverage"}),e.jsx(i.td,{children:"80%"}),e.jsx(i.td,{children:"89%"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Max File Size"}),e.jsx(i.td,{children:"4MB"}),e.jsx(i.td,{children:"500MB"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Max Concurrent Requests"}),e.jsx(i.td,{children:"~200"}),e.jsx(i.td,{children:"~500"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Proportion of successful imports (from test data)"}),e.jsx(i.td,{children:"68%"}),e.jsx(i.td,{children:"85%"})]})]})]}),`
`,e.jsx(i.h1,{id:"defining-the-problem",children:"Defining the problem"}),`
`,e.jsxs(i.p,{children:["During my 2025 summer I had the honor of interning with ",e.jsx(i.a,{href:"http://onxmaps.com",children:"OnX Maps"}),", a company focused on bringing the explorer out in everyone."]}),`
`,e.jsx(i.h2,{id:"the-importance-of-markups",children:"The importance of markups"}),`
`,e.jsx(i.p,{children:"One of the biggest selling features of these applications is their ability to mark up maps with your own content. I'm sure we can all relate to the expirience of having visited some amazing place only to never be able to find it again."}),`
`,e.jsx(i.p,{children:"As you can imagine bringing over content from other applications or gear is another pretty big component. If you recorded a hiking track on your Garmin watch, or have some content you want to bring over from alltrails we support you importing that into our system."}),`
`,e.jsx(i.h2,{id:"the-problem-with-imports",children:"The problem with imports"}),`
`,e.jsx(i.p,{children:"I was suprised to learn this system had some existing flaws though:"}),`
`,e.jsx(i.h3,{id:"interdependent-service",children:"Interdependent Service"}),`
`,e.jsx(i.p,{children:"The original service was built as a monolithic program aimed to handle all endpoints for our customers content. This meant that if there was an issue with any of the endpoints, the entirety of customer content was affected."}),`
`,e.jsx(i.p,{children:"Combine this with the complexity of the codebase meant that it was hard to:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Push new features"}),`
`,e.jsx(i.li,{children:"Maintain coverage"}),`
`,e.jsx(i.li,{children:"Debug issues"}),`
`]}),`
`,e.jsx(i.h3,{id:"file-size-limitations",children:"File Size Limitations"}),`
`,e.jsxs(i.p,{children:["The previous solution processed all files before responding to the users inital HTTP request. That means updloads, processing, insertion, all happened in a single ",e.jsx(i.code,{children:"POST"})," command."]}),`
`,e.jsx(i.p,{children:"While that makes it very simple for our client apps it is very hard to scale. As a solution filesize was limited to 4MB to simply keep upload and process times from causing service lags."}),`
`,e.jsx(i.p,{children:"Along with this, it was a big problem because if imports lagged the service, the entire service for customer content would lag."}),`
`,e.jsx(i.h3,{id:"no-resilance-to-outagesdegredation",children:"No Resilance to Outages/Degredation"}),`
`,e.jsx(i.p,{children:"There are many reasons a backend service can degrage:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Too many concurrent requests"}),`
`,e.jsx(i.li,{children:"Outage with another service (Ex: a database)"}),`
`,e.jsx(i.li,{children:"Something went wrong with communication over the internet"}),`
`]}),`
`,e.jsx(i.p,{children:"Because our service retains no record of the files it's trying to process, if an outage happens the service will loose everything that's currently in progress."}),`
`,e.jsx(i.p,{children:"Same goes for if we break something with our service, if any error gets thrown thats data lost."}),`
`,e.jsx(i.h3,{id:"vauge-errors",children:"Vauge Errors"}),`
`,e.jsxs(i.p,{children:["Finally, when there was an issue importing a file the service would simply return ",e.jsx(i.code,{children:"there was a problem with your import"}),". Yeah, frustratingly vauge..."]}),`
`,e.jsx(i.h1,{id:"solution",children:"Solution"}),`
`,e.jsxs(i.p,{children:["My solution was a ",e.jsx(i.code,{children:"golang"})," based service that addressed all of these issues:"]}),`
`,e.jsx(i.h3,{id:"interdependent-service-1",children:"Interdependent Service"}),`
`,e.jsx(i.p,{children:"This is now it's own service, capable of scaling based off relevant metrics (like size of queue) and plugs into OnX's Apollo Supergraph to federate and unify the API"}),`
`,e.jsx(i.h3,{id:"file-size-limitations--service-degredation",children:"File Size Limitations & Service Degredation"}),`
`,e.jsxs(i.p,{children:["Our service ",e.jsx(i.em,{children:"decouples uploads and processing"})," and uses queue services. This makes it easier to:"]}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Handle massive file sizes"}),`
`,e.jsx(i.li,{children:"Handler larger bursts of uploads"}),`
`,e.jsx(i.li,{children:"Handle service degredation gracefully"}),`
`]}),`
`,e.jsxs(i.p,{children:["In fact, our entire service built around this concept discussed in depth ",e.jsx(i.a,{href:"https://www.uber.com/blog/reliable-reprocessing/",children:"by uber on their use of Apache Kafka"})," and it works like this:"]}),`
`,e.jsx(i.p,{children:"TODO: Insert chart"}),`
`,e.jsx(i.h3,{id:"vague-error-elimination--data-mutation-notices",children:"Vague error elimination & data mutation notices"}),`
`,e.jsx(i.p,{children:"As a little bonus for the project I wanted to create errors that were precise, specific, and actionable. Go was actually incredibly nice for building these out. It allowed us to bubble up errors capturing context as we passed through layers of functions."}),`
`,e.jsx(i.p,{children:"Along with this a similar pattern helped create detailed notices on any mutations made to data in the dataset. This means if a customer bulk imports a bunch of data they plan on deleting they won't discover that something changed after deleting it."}),`
`,e.jsx(i.p,{children:"TODO: Ask for Photos from Zach"}),`
`,e.jsx(i.h1,{id:"bonus-service-monitoring",children:"Bonus: Service monitoring"}),`
`,e.jsx(i.p,{children:"Inially when setting out on the project I set up a SLO on the goals for my service from both a user and developer perspective."}),`
`,e.jsx(i.p,{children:"Later I used load testing to build realistic metrics for these goals, and built a dashboard helping capture insights into the preformance in accordande with these goals."}),`
`,e.jsx(i.p,{children:"TODO: Insert photo of dashboard"})]})}function r(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{r as default};

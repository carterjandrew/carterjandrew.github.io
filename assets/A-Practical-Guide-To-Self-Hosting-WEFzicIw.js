import{j as e}from"./index-ByR0HOzQ.js";function a(n){const s={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{id:"motivaiton",children:"Motivaiton"}),`
`,e.jsx(s.h2,{id:"self-hosting-is-suprisingly-useful",children:e.jsx(s.em,{children:e.jsx(s.strong,{children:"Self hosting is suprisingly useful"})})}),`
`,e.jsx(s.p,{children:"For example, I use it for:"}),`
`,e.jsx(s.h3,{id:"1-a-free-password-manager-synced-to-all-my-devices",children:"1. A free password manager synced to all my devices"}),`
`,e.jsxs(s.p,{children:["This is done using ",e.jsx(s.a,{href:"https://github.com/dani-garcia/vaultwarden",children:"Vaultwarden"})," as a backend",e.jsx(s.br,{}),`
`,"And ",e.jsx(s.a,{href:"https://bitwarden.com/",children:"Bitwarden"})," as a frontend"]}),`
`,e.jsx(s.h3,{id:"2-a-database-for-syncing-my-notes-and-music-across-my-devices",children:"2. A database for syncing my notes and music across my devices"}),`
`,e.jsxs(s.p,{children:["Done using ",e.jsx(s.a,{href:"https://syncthing.net/",children:"Syncthing"})]}),`
`,e.jsx(s.h3,{id:"3-a-libaray-of-books-with-the-progress-notes-bookmarks-highlights-and-titles-synced",children:"3. A libaray of books with the progress, notes, bookmarks, highlights, and titles synced"}),`
`,e.jsx(s.p,{children:"Done using:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://github.com/booklore-app/BookLore",children:"Booklore"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://github.com/koreader/koreader-sync-server",children:"Koreader Sync"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"https://koreader.rocks/",children:"Koreader"})}),`
`]}),`
`,e.jsx(s.h3,{id:"4-a-database-for-hosting-content-for-my-website",children:"4. A database for hosting content for my website"}),`
`,e.jsxs(s.p,{children:["Done using ",e.jsx(s.a,{href:"https://pocketbase.io/",children:"Pocketbase"})]}),`
`,e.jsx(s.h1,{id:"how-i-do-all-of-this-for-free-on-a-old-laptop",children:"How I do all of this for free on a old laptop"}),`
`,e.jsx(s.p,{children:"Theres one tool that makes this magic come to life:"}),`
`,e.jsx(s.h3,{id:"tailscale",children:e.jsx(s.em,{children:e.jsx(s.strong,{children:"Tailscale"})})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.a,{href:"https://tailscale.com/",children:"Tailscale"})," is magical. It gives you:"]}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:"Fast, seamless device connectivity — no hardware, no firewall rules, no wasted time."}),`
`]}),`
`,e.jsxs(s.p,{children:["Basically, it's a free vpn with some ",e.jsx(s.strong,{children:"incredibly"})," useful extras.",e.jsx(s.br,{}),`
`,"It lets you:"]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Connect all your devices like their on your local network"}),`
`,e.jsx(s.li,{children:"Serve content privately over the vpn network"}),`
`,e.jsx(s.li,{children:"Server content publicly on the web to anyone"}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsxs(s.em,{children:["So if you take anything from this article it should be ",e.jsx(s.strong,{children:"a shameless plug for Tailscale"})]})," and the incredible services it offers. ",e.jsxs(s.strong,{children:["To get started visit ",e.jsx(s.a,{href:"https://tailscale.com/kb/1017/install",children:"here"})]}),"."]}),`
`,e.jsx(s.p,{children:"I'll break down how this works here:"}),`
`,e.jsx(s.h3,{id:"how-it-works",children:"How it works"}),`
`,e.jsx(s.h4,{id:"connecting-all-your-devices-like-their-on-your-local-network",children:"Connecting all your devices like their on your local network"}),`
`,e.jsx(s.p,{children:"This is just what tailscale does out of the box. If you run"}),`
`,e.jsx(s.pre,{className:"language-shell",children:e.jsx(s.code,{className:"language-shell code-highlight",children:e.jsx(s.span,{className:"code-line",children:`tailscale status
`})})}),`
`,e.jsx(s.p,{children:"on a device with it installed you will see something like:"}),`
`,e.jsx(s.pre,{children:e.jsxs(s.code,{className:"code-highlight",children:[e.jsx(s.span,{className:"code-line",children:`100.90.94.104    carters-laptop    carterinmotion@  linux    -
`}),e.jsx(s.span,{className:"code-line",children:`100.84.115.59    desktop           carterinmotion@  linux    offline, last seen 141d ago
`}),e.jsx(s.span,{className:"code-line",children:`100.113.140.51   hisense-hitv205n  carterinmotion@  android  offline, last seen 1h ago
`}),e.jsx(s.span,{className:"code-line",children:`100.78.52.52     iphone-12-pro-1   carterinmotion@  iOS      -
`}),e.jsx(s.span,{className:"code-line",children:`100.79.79.113    iphone-12-pro     carterinmotion@  iOS      offline, last seen 47d ago
`}),e.jsx(s.span,{className:"code-line",children:`100.76.81.33     onyx-noteair      carterinmotion@  android  offline, last seen 143d ago
`}),e.jsx(s.span,{className:"code-line",children:`100.109.210.115  surface-server    carterinmotion@  linux    active; direct 192.168.0.18:41641, tx 111608 rx 158676
`})]})}),`
`,e.jsxs(s.p,{children:["All of these devices, from anywhere in the world, can be accessed using the ",e.jsx(s.em,{children:"ip addresses"})," or the ",e.jsx(s.em,{children:"name"})," listed in the second column.",e.jsx(s.br,{}),`
`,"So for example I could do:"]}),`
`,e.jsx(s.pre,{className:"language-shell",children:e.jsx(s.code,{className:"language-shell code-highlight",children:e.jsxs(s.span,{className:"code-line",children:[e.jsx(s.span,{className:"token function",children:"ssh"}),` surface-server
`]})})}),`
`,e.jsx(s.p,{children:"to connect to my default account over ssh."}),`
`,e.jsx(s.p,{children:"Not impressed yet? Check this out:"}),`
`,e.jsx(s.p,{children:"If I run instead:"}),`
`,e.jsx(s.pre,{className:"language-shell",children:e.jsx(s.code,{className:"language-shell code-highlight",children:e.jsxs(s.span,{className:"code-line",children:[e.jsx(s.span,{className:"token function",children:"ssh"})," ",e.jsx(s.span,{className:"token parameter variable",children:"-L"})," ",e.jsx(s.span,{className:"token number",children:"6060"}),`:localhost:6060 surface-server
`]})})}),`
`,e.jsxs(s.p,{children:["Now if we were serving a website on port 6060 on the server, we would be able to see that at ",e.jsx(s.code,{children:"localhost:6060"})," on our machine connecting."]}),`
`,e.jsx(s.p,{children:"Now, obviously we don't want to need to ssh into the server anytime we want to connect to it, so lets take this a step further:"}),`
`,e.jsx(s.h4,{id:"serve-content-privately-over-the-vpn-network",children:"Serve content privately over the vpn network"}),`
`,e.jsxs(s.p,{children:["Using a service called ",e.jsx(s.code,{children:"tailscale serve"})," we can make a url ",e.jsx(s.em,{children:"any device on our tailscale network"})," can use to see content. So if we logged onto our server and called:"]}),`
`,e.jsx(s.pre,{className:"language-bash",children:e.jsx(s.code,{className:"language-bash code-highlight",children:e.jsxs(s.span,{className:"code-line",children:["tailscale serve ",e.jsx(s.span,{className:"token parameter variable",children:"--https"}),e.jsx(s.span,{className:"token operator",children:"="}),e.jsx(s.span,{className:"token number",children:"6060"}),` http://localhost:6060
`]})})}),`
`,e.jsx(s.p,{children:"we should see:"}),`
`,e.jsx(s.pre,{children:e.jsxs(s.code,{className:"code-highlight",children:[e.jsx(s.span,{className:"code-line",children:`Available within your tailnet:
`}),e.jsx(s.span,{className:"code-line",children:`
`}),e.jsx(s.span,{className:"code-line",children:`https://surface-server.tail6e709.ts.net:6060/
`}),e.jsx(s.span,{className:"code-line",children:`|-- proxy http://localhost:6060
`}),e.jsx(s.span,{className:"code-line",children:`
`}),e.jsx(s.span,{className:"code-line",children:`Press Ctrl+C to exit.
`})]})}),`
`,e.jsx(s.p,{children:"Now if we went to that url on our device, we would be able to see the website being served there!"}),`
`,e.jsxs(s.p,{children:["Now we can make this a ",e.jsx(s.strong,{children:"persistant background service"})," by calling:"]}),`
`,e.jsx(s.pre,{className:"language-bash",children:e.jsx(s.code,{className:"language-bash code-highlight",children:e.jsxs(s.span,{className:"code-line",children:["tailscale serve ",e.jsx(s.span,{className:"token parameter variable",children:"--https"}),e.jsx(s.span,{className:"token operator",children:"="}),e.jsx(s.span,{className:"token number",children:"6060"})," ",e.jsx(s.span,{className:"token parameter variable",children:"--bg"}),` http://localhost:6060
`]})})}),`
`,e.jsxs(s.p,{children:["now if we were to call: ",e.jsx(s.code,{children:"tailscale status"})," we would see:"]}),`
`,e.jsx(s.pre,{children:e.jsxs(s.code,{className:"code-highlight",children:[e.jsx(s.span,{className:"code-line",children:`https://surface-server.tail6e709.ts.net:6060 (tailnet only)
`}),e.jsx(s.span,{className:"code-line",children:`|-- / proxy http://localhost:6060
`})]})}),`
`,e.jsx(s.p,{children:"so we could do this for a whole bunch of services, and access them all using our other devices from these urls."}),`
`,e.jsx(s.p,{children:e.jsx(s.em,{children:e.jsx(s.strong,{children:"Still not impressed? Keep reading"})})}),`
`,e.jsx(s.h4,{id:"server-content-publicly-on-the-web-to-anyone",children:"Server content publicly on the web to anyone"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.a,{href:"https://tailscale.com/kb/1223/funnel",children:"Tailscale funnel"})," is a service that works like ",e.jsx(s.code,{children:"serve"}),", except it is publicly availible.",e.jsx(s.br,{}),`
`,"So in my case I use pocketbase to serve some content on my website. You could use:"]}),`
`,e.jsx(s.pre,{className:"language-bash",children:e.jsx(s.code,{className:"language-bash code-highlight",children:e.jsxs(s.span,{className:"code-line",children:["tailscale funnel ",e.jsx(s.span,{className:"token parameter variable",children:"--https"}),e.jsx(s.span,{className:"token operator",children:"="}),e.jsx(s.span,{className:"token number",children:"443"})," --set-path",e.jsx(s.span,{className:"token operator",children:"="}),"/pocketbase/ ",e.jsx(s.span,{className:"token parameter variable",children:"--bg"})," ",e.jsx(s.span,{className:"token number",children:"8090"}),`
`]})})}),`
`,e.jsxs(s.p,{children:["to run a funnel for my database service over port 8090. And running ",e.jsx(s.code,{children:"tailscale status"})," again shows us:"]}),`
`,e.jsx(s.pre,{children:e.jsxs(s.code,{className:"code-highlight",children:[e.jsx(s.span,{className:"code-line",children:`# Funnel on:
`}),e.jsx(s.span,{className:"code-line",children:`#     - https://surface-server.tail6e709.ts.net
`}),e.jsx(s.span,{className:"code-line",children:`
`}),e.jsx(s.span,{className:"code-line",children:`https://surface-server.tail6e709.ts.net (Funnel on)
`}),e.jsx(s.span,{className:"code-line",children:`|-- /pocketbase/ proxy http://127.0.0.1:8090
`})]})}),`
`,e.jsxs(s.p,{children:["Now anyone, even you could visit ",e.jsx(s.a,{href:"https://surface-server.tail9e320.ts.net/pocketbase/_/",children:"this link"})," and see my pocketbase server running live"]}),`
`,e.jsx(s.h1,{id:"the-second-part-to-this-magic",children:"The second part to this magic:"}),`
`,e.jsx(s.h2,{id:"nixos",children:e.jsx(s.em,{children:e.jsx(s.strong,{children:"NixOS"})})}),`
`,e.jsxs(s.p,{children:["Now, to be honest, if you are not tech savy ",e.jsx(s.strong,{children:"I absolutley would not reccomend NixOS to you"}),". In practise it is implemented in a way that gives utterly ",e.jsx(s.em,{children:"terrible"})," errors, and is a lot to learn. But it comes with some major upsides:"]}),`
`,e.jsx(s.p,{children:`It does not require you to keep everything up to date when you add new packages
It makes experimenting incredibly easy
It makes recovering incredibly easy
It makes configuration of anything easy to do remotely from anywhere`})]})}function i(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(a,{...n})}):a(n)}export{i as default};

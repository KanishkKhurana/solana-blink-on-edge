# Solana Blinks on Edge
Using this repo, let's learn how solana blinks can exist as edge functions on Fleek, popularily known as Fleek Functions

## Getting Started
1. Clone the repo
2. Install dependencies - `npm i`
3. Build the Fleek Function - `npm run build`
4. Create and Deploy the Fleek Function using the Fleek CLI
   1. `fleek functions create --name blink`
   2. `fleek functions deploy --name blink --path ./src/index.js`

## Fundamentals
- Fleek functions enable serverless code execution and minimal devops overhead. These functions can be fetched from any data origin and Fleek can host them and ensure maximum performance and low latency. In our case we are using IPFS to store them, as at the time of writing this, the Fleek CLI supports it. JS runtime is a service on Fleek that enables javascript Fleek Functions.

![image](https://github.com/KanishkKhurana/solana-blink-on-edge/assets/74613246/7459e2d6-b1c9-4a3f-b9f1-56a0e9be5d93)

- Solana Actions are specification-compliant APIs that return transactions on the Solana blockchain to be previewed, signed, and sent across a number of various contexts, including QR codes, buttons + widgets, and websites across the internet
- Blockchain links – or blinks – turn any Solana Action into a shareable, metadata-rich link. Blinks allow Action-aware clients (browser extension wallets, bots) to display additional capabilities for the user

[Learn more about Fleek Functions and JS Runtime here](https://blog.fleek.network/post/fleek-network-developer-guide-js-runtime/)

## Flow
1. A client makes  a `GET` request to a Fleek Function and fetches metadata about the solana action available
2. Fleek Function endpoint responds with `icon`, `title`, `description`, `label`. 
3. Client app displays the UI so the user can perform actions. (Please note that you need Backpack, Phantom or Solflare to view Blinks properly on apps like X)
4. As user selected an action (by clicking a button), client makes a `POST` request to the Fleek Function endpoint.
5. Wallet facilitates the user signing the transaction and ultimately sends the transaction to the blockchain for confirmation

[Checkout the solana docs for more information](https://solana.com/docs/advanced/actions#action-execution-and-lifecycle)

## Improvements
If you notice any bugs or ways i can make the solana transaction signing better, please let me know via telegram or twitter

A set of simple and useful hooks for react facilitating use of the <b>Ethereum provider API</b>

## ⚙ Installation️

```sh
npm install @guchii/w3b
```

```sh
yarn add @guchii/w3b
```

```sh
pnpm add @guchii/w3b
```

## 🧠 Usage

See the usage from the demo app in the apps directory. [See here](https://github.com/Guchii/w3b/blob/main/apps/demo/src/App.tsx)

```js
const App = () => {
    // call the useW3b hook on the top of your entry component 
    useW3b(); 
    // you may now use the other hooks
    return (
        <>
            ...
        </>
    );
}
```

Uses <b>ethers, zustand, and immer.js</b>

### PS
This is my first library/package thing.

The hooks are working and usable, but I'd suggest using [useDApp](https://github.com/TrueFiEng/useDApp/), It's feature complete and reliable.
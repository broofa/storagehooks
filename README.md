# storagehooks

React hooks for connecting component state to state in `localStorage` and
`sessionStorage`.

Features:
  * Supports `localStorage` and `sessionStorage`
  * Values may be any JSON data type
  * `storage` event support
  * Simple API (similar to React's `useState()`)

![storagehooks](https://user-images.githubusercontent.com/164050/119719171-2aac1780-be04-11eb-9892-a2bef582ffc2.gif)


# Usage

Import `useLocalStorage` or `useSessionStorage` (based on your preferred Web
Storage location)

```js
import {useLocalStorage, useSessionStorage} from 'storagehooks';

function myComponent(props) {
  // Use it like `useState()`, but provide name of storage key as the first argument
  const [localValue, setLocalValue] = useLocalStorage('myKey', 'initial value');
  const [sessionValue, setSessionValue] = useSessionStorage('myKey', 'initial value');

  return <>
    <label>Value in localStorage:</label>
    <input value={localValue} onChange={e => setLocalValue(e.target.value)} />

    <label>Value in sessionStorage:</label>
    <input value={sessionValue} onChange={e => setSessionValue(e.target.value)} />
  </>;
}
```

# API

## useLocalStorage(key[, initialValue [, options]])
## useSessionStorage(key[, initialValue [, options]])

|   |   |
|---|---|
| `key` | (String) key in storage where value is saved | 
| `initialValue` | (any) initial value (passed to `useState()`) | 
| `options.listen` | If `true` (the default), a listener is used to update the value in response to "storage" events | 
| `options.dispatch` | If `true` (the default), a "storage" event is dispatched to the current window when the value is changed | 
| *returns* | [value, setValue] tuple, just like `useState()` |
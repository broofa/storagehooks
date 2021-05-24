# usestorage

React hooks for connecting component state to state in `localStorage` and
`sessionStorage`.

Features:
  * Supports `localStorage` and `sessionStorage`
  * Values may be any JSON data type
  * Listens to `storage` events to detect changes to storage state
  * Simple API (similar to React's `useState()`)

![usestorage](https://user-images.githubusercontent.com/164050/119408661-c7927780-bc81-11eb-8b73-4ec699ad3169.gif)


# Usage

Import `useLocalStorage` or `useSessionStorage` (based on your preferred Web
Storage location)

```js
import {useLocalStorage, useSessionStorage} from 'usestorage';

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

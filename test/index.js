import React from 'react';
import ReactDom from 'react-dom';
import { useLocalStorage, useSessionStorage } from '..';

function renderStorageContents () {
  document.querySelector('#sessionContents').innerText = JSON.stringify(window.sessionStorage, null, 2);
  document.querySelector('#localContents').innerText = JSON.stringify(window.localStorage, null, 2);
}

window.onload = function () {
  renderStorageContents();
  window.addEventListener('storage', renderStorageContents);
};

function App () {
  const [sessionValue, setSessionValue] = useSessionStorage('sessionValue');
  const [localValue, setLocalValue] = useLocalStorage('localValue');

  // Test storage event handling.  We create another set of hooks here,
  // connected to the same storage keys as above.  These should stay synced
  // if the `storage` event handling is working properly.
  const [sessionValueClone, setSessionValueClone] = useSessionStorage('sessionValue');

  const [booleanValue, setBooleanValue] = useLocalStorage('booleanValue', true);
  const [numberValue, setNumberValue] = useLocalStorage('numberValue', true);

  return (
    <>
      <h2><code>usestorage</code> test</h2>

      <div style={{ display: 'grid', gap: '1em', gridTemplateColumns: '1fr 2fr' }}>
        <label>sessionStorage.sessionValue</label>
        <input value={sessionValue ?? ''} onChange={e => setSessionValue(e.target.value)} />

        <label>sessionStorage.sessionValue (clone)</label>
        <input value={sessionValueClone ?? ''} onChange={e => setSessionValueClone(e.target.value)} />

        <label>localStorage.sessionValue</label>
        <input value={localValue ?? ''} onChange={e => setLocalValue(e.target.value)} />

        <label>localStorage.booleanValue</label>
        <input type='checkbox' checked={booleanValue} onChange={e => setBooleanValue(e.target.checked)} />
        <label>localStorage.numberValue</label>
        <input type='range' value={numberValue} onChange={e => setNumberValue(Number(e.target.value))} />
      </div>

      <hr />

      <div style={{ display: 'flex', gap: '1em' }}>
        <div style={{ display: 'flex', flexGrow: '1fr', flexDirection: 'column', padding: '1em', border: 'solid 1px #ccc', borderRadius: '1em' }}>
          <strong>sessionStorage</strong>
          <div id='sessionContents' style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }} />
        </div>
        <div style={{ display: 'flex', flexGrow: '1fr', flexDirection: 'column', padding: '1em', border: 'solid 1px #ccc', borderRadius: '1em' }}>
          <strong>localStorage</strong>
          <div id='localContents' style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }} />
        </div>
      </div>
    </>
  );
}

ReactDom.render(<App />, document.querySelector('#content'));

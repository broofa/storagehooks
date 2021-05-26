import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useLocalStorage, useSessionStorage } from '..';

function StorageField ({ name, initialValue, useStorageEvents, ...props }) {
  const options = { listen: useStorageEvents, dispatch: useStorageEvents };
  const [val, setVal] = /^local/.test(name)
    ? useLocalStorage(name, initialValue, options)
    : useSessionStorage(name, initialValue, options);
  let inputProps;
  switch (typeof initialValue) {
    case 'string':
      inputProps = {
        type: 'text',
        value: val ?? '',
        onChange (e) {
          setVal(e.target.value);
        }
      };
      break;

    case 'boolean':
      inputProps = {
        type: 'checkbox',
        checked: val,
        onChange (e) {
          setVal(e.target.checked);
        }
      };
      break;

    case 'number':
      inputProps = {
        type: 'range',
        value: val,
        onChange (e) {
          setVal(Number(e.target.value));
        }
      };
      break;

    default:
      throw Error(`Invalid default value: ${initialValue}`);
  }

  return <input className='storage-field' {...inputProps} />;
}

function App () {
  const [useStorageEvents, setUseStorageEvents] = useState(true);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <h2 style={{ margin: '0 0 .5em 0' }}><code>storagehooks</code> test</h2>

        <label style={{ flexGrow: 1, textAlign: 'right' }}>
          <input
            type='checkbox'
            style={{ verticalAlign: 'middle' }}
            checked={useStorageEvents}
            onChange={e => setUseStorageEvents(e.target.checked)}
          />
          Listen & Dispatch "storage" events
        </label>
      </div>

      <div className='grid' style={{ display: 'grid', gap: '1em', gridTemplateColumns: 'max-content 1fr 1fr' }}>
        <strong>Location</strong>
        <strong>Input 1</strong>
        <strong>Input 2</strong>

        <label>sessionStorage.sessionString</label>
        <StorageField name='sessionString' useStorageEvents={useStorageEvents} initialValue='' />
        <StorageField name='sessionString' useStorageEvents={useStorageEvents} initialValue='' />

        <label>localStorage.localString</label>
        <StorageField name='localString' useStorageEvents={useStorageEvents} initialValue='' />
        <StorageField name='localString' useStorageEvents={useStorageEvents} initialValue='' />

        <label>localStorage.localBool</label>
        <StorageField name='localBool' useStorageEvents={useStorageEvents} initialValue />
        <StorageField name='localBool' useStorageEvents={useStorageEvents} initialValue />

        <label>localStorage.localNumber</label>
        <StorageField name='localNumber' useStorageEvents={useStorageEvents} initialValue={1} />
        <StorageField name='localNumber' useStorageEvents={useStorageEvents} initialValue={1} />
      </div>
    </>
  );
}

ReactDom.render(<App />, document.querySelector('#content'));

import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({createThread, authUser}) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  function createThreadHandler(event) {
    event.preventDefault();
    createThread({title, category, body});
    setBody('');
    bodyRef.current.textContent = '';
  }

  function onBodyChangeEventHandler() {
    setBody(bodyRef.current.textContent);
  }

  if (authUser === null) {
    return null;
  }

  return (
    <div className='new-thread-page'>
      <h2>Buat Diskusi Baru</h2>
      <form className='new-thread-input'>
        <input type="text" value={title} onChange={onTitleChange} placeholder="Judul" />
        <input type="text" value={category} onChange={onCategoryChange} placeholder="Kategori" />
        <div
          className='input-body'
          contentEditable='true'
          onInput={onBodyChangeEventHandler}
          ref={bodyRef}
        ></div>
        <button type="submit" onClick={createThreadHandler}>Buat</button>
      </form>
    </div>
  );
}

ThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
  authUser: PropTypes.object,
};

export default ThreadInput;

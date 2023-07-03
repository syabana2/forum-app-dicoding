import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function CommentInput({addComment, authUser}) {
  const [content, setContent] = useState('');
  const contentRef = useRef(null);

  function addCommentHandler(event) {
    event.preventDefault();
    addComment(content);
    setContent('');
    contentRef.current.textContent = '';
  }

  function onContentChangeEventHandler() {
    setContent(contentRef.current.textContent);
  }

  return (
    <div className='thread-comment__input'>
      <h3>Beri Komentar</h3>
      {
        authUser === null ? (
          <p className='thread-comment__not_login'>
            <Link to='/login'>Login</Link> Untuk memberi komentar
          </p>
        ) : (
          <form className='comment-input'>
            <div
              className='comment-input__field'
              contentEditable='true'
              onInput={onContentChangeEventHandler}
              ref={contentRef}
            ></div>
            <button type="submit" onClick={addCommentHandler}>Kirim</button>
          </form>
        )
      }
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  authUser: PropTypes.object,
};

export default CommentInput;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RichTextEditor } from '@mantine/rte';

function ThreadReplyInput({ auth, replyThread }) {
    const [content, setContent] = useState('');
    const [isEmptyInput, setEmptyInput] = useState(false);
    const { id, name, avatar } = auth;

    function replyThreadHandler(event) {
        event.preventDefault();

        if (!content.trim() || content.replace(/<[^>]*>?/gm, '').trim() === '') {
            setEmptyInput(true);
            return;
        }

        replyThread(content);
        setContent('');
    }

    function handleReplyThreadChange(event) {
        setEmptyInput(false);
        setContent(event);
    }

    return (
        <div className="reply-input">
            <div className="reply-card">
                <div className="detail-user">
                    <img src={avatar} alt={id} title={name} className="user-icon" />
                    <div className="detail-user__name">{name}</div>
                </div>
                <form onSubmit={replyThreadHandler} className="comment-form">
                    <RichTextEditor
                        id="rte"
                        placeholder="Inputkan isi diskusi disini..."
                        value={content}
                        onChange={handleReplyThreadChange}
                        controls={[
                            ['bold', 'italic'],
                            ['underline', 'strike'],
                            ['image', 'link', 'blockquote'],
                            ['code', 'codeBlock']
                        ]}
                        sx={{
                            overflowY: 'auto',
                            minHeight: 200,
                            maxHeight: 400,
                            backgroundColor: '#F6F5F5',
                            color: '#141517',
                            border: `1px solid ${isEmptyInput ? 'red' : '#D1D1D1'}`,
                        }}
                    />
                    {isEmptyInput && <p style={{ color: 'red' }}>Komentar tidak boleh kosong</p>}
                    <div className="reply-button">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const authUserShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

ThreadReplyInput.propTypes = {
    auth: PropTypes.shape(authUserShape).isRequired,
    replyThread: PropTypes.func.isRequired
};

export default ThreadReplyInput;

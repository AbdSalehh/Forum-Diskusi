import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RichTextEditor } from '@mantine/rte';
import useInput from '../../hooks/useInput';

function ThreadInput({ addThread, closeModal }) {
    const [title, onTitleChange] = useInput('');
    const [category, onCategoryChange] = useInput('');
    const [body, setBody] = useState('');

    function onBodyChangeEventHandler(event) {
        setBody(event);
    }

    function onSaveEventHandler(event) {
        document.body.style.overflow = 'unset';
        event.preventDefault();

        addThread(title, category, body);
        setBody('');
    }

    function onCloseModalHandler() {
        document.body.style.overflow = 'unset';
        closeModal();
    }

    return (
        <div className="popup-box">
            <div className="popup-content">
                <div className="popup-header">
                    <h3>Tambah Diskusi</h3>
                    <button type="button" className="button close-button" onClick={onCloseModalHandler}>
                        <span>&times;</span>
                    </button>
                </div>
                <form className="form" onSubmit={onSaveEventHandler}>
                    <div className="form-header">
                        <label>
                            <h4 style={{ color: '#2F2F2F' }}>Judul</h4>
                            <input
                                type="text"
                                name="title"
                                placeholder="Inputkan judul diskusi disini..."
                                value={title}
                                onChange={onTitleChange}
                            />
                        </label>
                        <label>
                            <h4 style={{ color: '#2F2F2F' }}>Kategori</h4>
                            <input
                                type="text"
                                name="title"
                                placeholder="Inputkan kategori diskusi disini..."
                                value={category}
                                onChange={onCategoryChange}
                            />
                        </label>
                    </div>
                    <h4 style={{ color: '#2F2F2F' }}>Isi</h4>
                    <RichTextEditor
                        id="rte"
                        placeholder="Inputkan isi diskusi disini..."
                        value={body}
                        onChange={onBodyChangeEventHandler}
                        controls={[
                            ['bold', 'italic'],
                            ['underline', 'strike'],
                            ['link', 'blockquote'],
                            ['code', 'codeBlock']
                        ]}
                        sx={{
                            overflowY: 'auto',
                            height: 300,
                            backgroundColor: '#fafafa',
                            color: '#141517',
                            border: '1px solid #D1D1D1',
                        }}
                    />
                    <button className="button add-button" type="submit">Tambah</button>
                </form>
            </div>
        </div>
    );
}

ThreadInput.propTypes = {
    addThread: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default ThreadInput;

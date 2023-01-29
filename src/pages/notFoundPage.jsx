import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="not-found">
            <div className="not-found__image"></div>
            <p>Oops! Halaman yang anda cari tidak ditemukan.</p>
            <Link to="/" className="not-found__link">Kembali ke halaman beranda</Link>
        </div>
    );
}

export default NotFoundPage;

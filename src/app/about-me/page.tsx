'use client';

import { useState, useEffect } from 'react';

export default function AboutMePage() {
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [website, setWebsite] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch('/api/about-me');
            if (res.ok) {
                const data = await res.json();
                if (data) {
                    setBio(data.bio || '');
                    setImage(data.image || '');
                    setWebsite(data.website || '');
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        const res = await fetch('/api/about-me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bio, image, website }),
        });

        if (res.ok) {
            alert('Профиль обновлён!');
        } else {
            alert('Ошибка обновления');
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
            <h1>About Me</h1>
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

            <label>Image URL:</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} />

            <label>Website:</label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)} />

            <button onClick={handleSave} style={{ marginTop: 10 }}>Сохранить</button>
        </div>
    );
}

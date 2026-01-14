import React, { useState } from 'react';

const BirthChartForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        place: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.date) {
            localStorage.setItem('aura_username', formData.name);
            localStorage.setItem('aura_birthdata', JSON.stringify(formData));
            onSubmit(formData);
        }
    };

    return (
        <div className="center-col animate-fade-in">
            <h2 className="mb-8" style={{ fontSize: '1.5rem', letterSpacing: '0.2em', color: '#fff' }}>
                COSMIC ALIGNMENT
            </h2>

            <form onSubmit={handleSubmit} className="glass-panel">

                <div className="form-group">
                    <label className="label">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label className="label">Date of Birth</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Time (Optional)</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Place of Birth</label>
                    <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        placeholder="City, Country"
                        autoComplete="off"
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn-cosmic w-full">
                        Analyze Chart
                    </button>
                </div>

            </form>
        </div>
    );
};

export default BirthChartForm;

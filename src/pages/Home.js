import React from 'react';

const Home = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 700, fontSize: '2.5rem', color: '#1976d2' }}>
                Welcome to the Reverse Job Portal.
            </h1>
            <section style={{
                margin: '2rem auto',
                maxWidth: 700,
                background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
                padding: '2rem',
                border: '1px solid #bbdefb'
            }}>
                <h2 style={{ color: '#1976d2', fontWeight: 600, marginBottom: '1rem' }}>About Us</h2>
                <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1rem' }}>
                    Traditional job portals are designed mainly for employers, where companies post job vacancies and job seekers apply for them. However, this approach limits the visibility of individual talents and does not fully highlight the skills, capabilities, and potential of employees.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#333' }}>
                    This project proposes a reverse job portal system, where employees create job posts about themselves, showcasing their skills, experience, capabilities, and career interests. Employers can browse these posts to find suitable candidates and express interest directly. This approach empowers employees while simplifying candidate discovery for employers.
                </p>
            </section>
        </div>
    );
};

export default Home;
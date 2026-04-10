import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import '../css/Auth.css';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (password !== password1) {
            setError("Passwords do not match");
            setPassword('');
            setPassword1('');
            return;
        }

        setLoading(true);

        const result = await register(email, password);
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-logo">
                    <i className="fa-solid fa-bolt"></i><span>MuliPlay</span>
                </div>
                <form className="auth-form" onSubmit={handleRegister}>
                    {error && <div className="auth-error">{error}</div>}
                    <input type="email" 
                        placeholder="Email address"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input type="password"
                        placeholder="Password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input type="password"
                        placeholder="Enter password again"
                        className="auth-input"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to ="/login"><span> Login</span></Link>
                </div>
            </div>
        </div>
    );
};
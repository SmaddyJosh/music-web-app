import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import '../css/Auth.css';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result=await login(email, password);
        if (result.success) {
            navigate('/');
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
                <form className="auth-form" onSubmit={handleLogin}>
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
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="auth-link">
                    Dont have an account? <Link to ="/register"><span> Sign up</span></Link>
                </div>
            </div>
        </div>
    );
};
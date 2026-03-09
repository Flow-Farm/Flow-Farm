import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) console.log("Login details ready for backend");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .signin-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background-color: #0e1628;
          overflow: hidden;
          position: relative;
        }

        /* Animated background blobs */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .bg-blob-1 {
          width: 500px; height: 500px;
          background: #87aece;
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .bg-blob-2 {
          width: 500px; height: 500px;
          background: #afd06e;
          bottom: -100px; right: 15%;
          opacity: 0.28;
          animation-delay: -4s;
        }
        .bg-blob-3 {
          width: 320px; height: 320px;
          background: #407118;
          top: 40%; right: -60px;
          opacity: 0.3;
          animation-delay: -8s;
        }
        .bg-blob-4 {
          width: 260px; height: 260px;
          background: #afd06e;
          top: 10%; left: 35%;
          opacity: 0.12;
          animation-delay: -2s;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* Grid texture overlay */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(175,208,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(175,208,110,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Floating leaf decorations */
        .leaf {
          position: absolute;
          opacity: 0.07;
          pointer-events: none;
          animation: leaf-sway 8s ease-in-out infinite alternate;
        }
        .leaf-1 { top: 8%; right: 12%; animation-delay: 0s; }
        .leaf-2 { bottom: 12%; left: 8%; animation-delay: -3s; transform: rotate(120deg); }
        .leaf-3 { top: 55%; left: 42%; animation-delay: -5s; transform: rotate(60deg); opacity: 0.05; }

        @keyframes leaf-sway {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(8deg) scale(1.05); }
        }

        /* Left panel */
        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 64px;
          position: relative;
          z-index: 2;
        }

        .brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(175, 208, 110, 0.1);
          border: 1px solid rgba(175, 208, 110, 0.25);
          border-radius: 100px;
          padding: 6px 14px;
          width: fit-content;
          margin-bottom: 40px;
        }
        .brand-pill-dot {
          width: 7px; height: 7px;
          background: #afd06e;
          border-radius: 50%;
          box-shadow: 0 0 8px #afd06e;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
        .brand-pill-text {
          font-size: 12px;
          font-weight: 500;
          color: #afd06e;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 600;
          color: #f0f4ff;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .hero-title span {
          color: #afd06e;
        }

        .hero-sub {
          font-size: 15px;
          color: rgba(240,244,255,0.45);
          line-height: 1.7;
          max-width: 340px;
          margin-bottom: 56px;
        }

        .stats-row {
          display: flex;
          gap: 36px;
        }
        .stat-item {}
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #afd06e;
          font-weight: 600;
        }
        .stat-label {
          font-size: 11px;
          color: rgba(240,244,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        /* Divider */
        .panel-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(135,174,206,0.2) 30%, rgba(135,174,206,0.2) 70%, transparent);
          position: relative;
          z-index: 2;
          margin: 48px 0;
        }

        /* Right panel / form area */
        .right-panel {
          width: 460px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
          z-index: 2;
        }

        .form-card {
          width: 100%;
          background: rgba(64,113,24,0.06);
          border: 1px solid rgba(175,208,110,0.18);
          border-radius: 24px;
          padding: 44px 40px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #407118 20%, #afd06e 55%, #87aece 80%, transparent);
        }

        .form-eyebrow {
          font-size: 11px;
          font-weight: 500;
          color: #afd06e;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          color: #f0f4ff;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 13px;
          color: rgba(240,244,255,0.38);
          margin-bottom: 36px;
          line-height: 1.5;
        }

        .field-group {
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: rgba(240,244,255,0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .field-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.4;
          transition: opacity 0.2s;
          pointer-events: none;
          color: #87aece;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(135,174,206,0.2);
          border-radius: 12px;
          padding: 13px 14px 13px 40px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #f0f4ff;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .field-input::placeholder { color: rgba(240,244,255,0.2); }
        .field-input:focus {
          border-color: #87aece;
          background: rgba(135,174,206,0.07);
          box-shadow: 0 0 0 3px rgba(135,174,206,0.1);
        }
        .field-input.has-error {
          border-color: rgba(255,100,100,0.5);
        }
        .field-input:focus + .field-focus-line,
        .field-wrap:focus-within .field-icon { opacity: 1; }

        .error-msg {
          font-size: 11px;
          color: #ff8080;
          margin-top: 5px;
          padding-left: 4px;
        }

        .forgot-link {
          display: block;
          text-align: right;
          font-size: 12px;
          color: #afd06e;
          margin-top: -6px;
          margin-bottom: 28px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
          width: fit-content;
          margin-left: auto;
        }
        .forgot-link:hover { opacity: 0.7; }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #407118 0%, #5a9e24 100%);
          color: #f0f4ff;
          border: 1px solid rgba(175,208,110,0.3);
          border-radius: 12px;
          padding: 14px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
          letter-spacing: 0.03em;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(64,113,24,0.45); }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:active { transform: translateY(0); }

        .divider-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(175,208,110,0.15);
        }
        .divider-text {
          font-size: 11px;
          color: rgba(240,244,255,0.25);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .btn-google {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(135,174,206,0.2);
          border-radius: 12px;
          padding: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,244,255,0.6);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .btn-google:hover {
          border-color: rgba(135,174,206,0.45);
          background: rgba(135,174,206,0.06);
          color: rgba(240,244,255,0.9);
        }

        .signup-row {
          text-align: center;
          font-size: 12px;
          color: rgba(240,244,255,0.3);
          margin-top: 24px;
        }
        .signup-row a {
          color: #afd06e;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .signup-row a:hover { opacity: 0.7; }

        /* Decorative rings */
        .deco-ring {
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 1px solid rgba(175,208,110,0.14);
        }
        .deco-ring-2 {
          position: absolute;
          bottom: -60px;
          right: -60px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1px solid rgba(64,113,24,0.12);
        }

        @media (max-width: 800px) {
          .left-panel { display: none; }
          .panel-divider { display: none; }
          .signin-root { justify-content: center; background: #0e1628; }
          .right-panel { width: 100%; padding: 24px 20px; }
        }
      `}</style>

      <div className="signin-root">
        {/* Background effects */}
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
        <div className="bg-blob bg-blob-4" />
        <div className="bg-grid" />

        {/* Leaf decorations */}
        <svg className="leaf leaf-1" width="180" height="180" viewBox="0 0 100 100" fill="none">
          <path d="M50 5 C80 5, 95 30, 95 50 C95 75, 70 95, 50 95 C30 95, 5 75, 5 50 C5 25, 20 5, 50 5Z" fill="#afd06e"/>
          <path d="M50 5 L50 95" stroke="#407118" strokeWidth="2"/>
          <path d="M50 30 C60 25, 75 30, 80 40" stroke="#407118" strokeWidth="1.5" fill="none"/>
          <path d="M50 50 C60 45, 78 48, 82 58" stroke="#407118" strokeWidth="1.5" fill="none"/>
          <path d="M50 40 C40 35, 25 38, 20 48" stroke="#407118" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="leaf leaf-2" width="140" height="140" viewBox="0 0 100 100" fill="none">
          <path d="M50 5 C80 5, 95 30, 95 50 C95 75, 70 95, 50 95 C30 95, 5 75, 5 50 C5 25, 20 5, 50 5Z" fill="#afd06e"/>
          <path d="M50 5 L50 95" stroke="#407118" strokeWidth="2"/>
          <path d="M50 35 C62 28, 78 33, 83 45" stroke="#407118" strokeWidth="1.5" fill="none"/>
          <path d="M50 55 C38 48, 22 53, 18 65" stroke="#407118" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="leaf leaf-3" width="220" height="220" viewBox="0 0 100 100" fill="none">
          <path d="M50 5 C80 5, 95 30, 95 50 C95 75, 70 95, 50 95 C30 95, 5 75, 5 50 C5 25, 20 5, 50 5Z" fill="#afd06e"/>
          <path d="M50 5 L50 95" stroke="#407118" strokeWidth="2"/>
        </svg>

        {/* Left brand panel */}
        <div className="left-panel">
          <div className="brand-pill">
            <div className="brand-pill-dot" />
            <span className="brand-pill-text">Farm Flow Dashboard</span>
          </div>

          <h1 className="hero-title">
            Grow smarter.<br />
            <span>Harvest better.</span>
          </h1>

          <p className="hero-sub">
            Monitor your aquaponics ecosystem in real time; water quality, fish health, plant cycles, and yield analytics, all in one place.
          </p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">98.4%</div>
              <div className="stat-label">System uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12k+</div>
              <div className="stat-label">Active growers</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.9★</div>
              <div className="stat-label">Avg rating</div>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="panel-divider" />

        {/* Right form panel */}
        <div className="right-panel">
          <div className="form-card">
            <div className="deco-ring" />
            <div className="deco-ring-2" />

            
            <div className="form-title">Sign In</div>
            <div className="form-subtitle">Enter your credentials to access your dashboard</div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="3"/>
                      <path d="M2 8l10 6 10-6"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="youremail@africau.edu"
                    className={`field-input${errors.email ? " has-error" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                  />
                </div>
                {errors.email && <div className="error-msg">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`field-input${errors.password ? " has-error" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                  />
                </div>
                {errors.password && <div className="error-msg">{errors.password}</div>}
              </div>

              <a href="/forgotpassword" className="forgot-link">Forgot password?</a>

              <button type="submit" className="btn-primary">
                Sign In to Dashboard
              </button>
            </form>

            <div className="divider-row">
              <div className="divider-line" />
              <span className="divider-text">or</span>
              <div className="divider-line" />
            </div>

            <button type="button" className="btn-google">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="signup-row">
              Don't have an account?{" "}
              <Link to="/signup">Create one here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
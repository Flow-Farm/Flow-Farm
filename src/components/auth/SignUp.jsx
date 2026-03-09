import { useState } from "react";

// Mock Link component for standalone preview
const Link = ({ to, className, children }) => (
  <a href={to} className={className}>{children}</a>
);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) console.log("Ready to send to backend");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .signup-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background-color: #0e1628;
          overflow: hidden;
          position: relative;
        }

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
          top: -100px; right: -100px;
          animation-delay: 0s;
        }
        .bg-blob-2 {
          width: 500px; height: 500px;
          background: #afd06e;
          bottom: -100px; left: 15%;
          opacity: 0.28;
          animation-delay: -4s;
        }
        .bg-blob-3 {
          width: 320px; height: 320px;
          background: #407118;
          top: 40%; left: -60px;
          opacity: 0.3;
          animation-delay: -8s;
        }
        .bg-blob-4 {
          width: 260px; height: 260px;
          background: #afd06e;
          top: 10%; right: 35%;
          opacity: 0.12;
          animation-delay: -2s;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

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
        .leaf-1 { top: 6%; left: 10%; animation-delay: 0s; }
        .leaf-2 { bottom: 10%; right: 8%; animation-delay: -3s; transform: rotate(120deg); }
        .leaf-3 { top: 50%; right: 40%; animation-delay: -5s; transform: rotate(60deg); opacity: 0.05; }

        @keyframes leaf-sway {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(8deg) scale(1.05); }
        }

        /* Left form panel */
        .left-panel {
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

        .deco-ring {
          position: absolute;
          top: -30px;
          left: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          border: 1px solid rgba(175,208,110,0.14);
        }
        .deco-ring-2 {
          position: absolute;
          top: -60px;
          left: -60px;
          width: 180px; height: 180px;
          border-radius: 50%;
          border: 1px solid rgba(64,113,24,0.12);
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
          margin-bottom: 28px;
          line-height: 1.5;
        }

        /* Google button first */
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
          margin-bottom: 20px;
        }
        .btn-google:hover {
          border-color: rgba(135,174,206,0.45);
          background: rgba(135,174,206,0.06);
          color: rgba(240,244,255,0.9);
        }

        .divider-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
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
        .field-wrap:focus-within .field-icon { opacity: 1; }

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
        .field-input.has-error { border-color: rgba(255,100,100,0.5); }

        .error-msg {
          font-size: 11px;
          color: #ff8080;
          margin-top: 5px;
          padding-left: 4px;
        }

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
          transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: 0.03em;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
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

        .terms-text {
          font-size: 11px;
          color: rgba(240,244,255,0.25);
          text-align: center;
          margin-top: 16px;
          line-height: 1.6;
        }
        .terms-text a {
          color: rgba(175,208,110,0.7);
          text-decoration: none;
        }
        .terms-text a:hover { color: #afd06e; }

        .login-row {
          text-align: center;
          font-size: 12px;
          color: rgba(240,244,255,0.3);
          margin-top: 20px;
        }
        .login-row a {
          color: #afd06e;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .login-row a:hover { opacity: 0.7; }

        /* Right brand panel */
        .right-panel {
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
          background: rgba(175,208,110,0.1);
          border: 1px solid rgba(175,208,110,0.25);
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
        .hero-title span { color: #afd06e; }

        .hero-sub {
          font-size: 15px;
          color: rgba(240,244,255,0.45);
          line-height: 1.7;
          max-width: 340px;
          margin-bottom: 48px;
        }

        /* Feature list */
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .feature-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(175,208,110,0.1);
          border: 1px solid rgba(175,208,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #afd06e;
        }
        .feature-text-title {
          font-size: 13px;
          font-weight: 500;
          color: rgba(240,244,255,0.85);
          margin-bottom: 2px;
        }
        .feature-text-sub {
          font-size: 12px;
          color: rgba(240,244,255,0.35);
          line-height: 1.5;
        }

        /* Divider */
        .panel-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(175,208,110,0.15) 30%, rgba(175,208,110,0.15) 70%, transparent);
          position: relative;
          z-index: 2;
          margin: 48px 0;
        }

        @media (max-width: 800px) {
          .right-panel { display: none; }
          .panel-divider { display: none; }
          .signup-root { justify-content: center; }
          .left-panel { width: 100%; padding: 24px 20px; }
        }
      `}</style>

      <div className="signup-root">
        {/* Background */}
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

        {/* Left: Form */}
        <div className="left-panel">
          <div className="form-card">
            <div className="deco-ring" />
            <div className="deco-ring-2" />

            <div className="form-eyebrow">Get started</div>
            <div className="form-title">Create Account</div>
            <div className="form-subtitle">Join thousands of growers monitoring their ecosystems</div>

            {/* Google */}
            <button type="button" className="btn-google">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="divider-row">
              <div className="divider-line" />
              <span className="divider-text">or</span>
              <div className="divider-line" />
            </div>

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

              {/* Confirm Password */}
              <div className="field-group">
                <label className="field-label">Confirm Password</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 12l2 2 4-4"/>
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`field-input${errors.confirmPassword ? " has-error" : ""}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocused("confirm")}
                    onBlur={() => setFocused("")}
                  />
                </div>
                {errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
              </div>

              <button type="submit" className="btn-primary">
                Create Account
              </button>
            </form>

            <div className="terms-text">
              By creating an account you agree to our{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>

            <div className="login-row">
              Already have an account?{" "}
              <Link to="/">Log in here</Link>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="panel-divider" />

        {/* Right: Brand panel */}
        <div className="right-panel">
          <div className="brand-pill">
            <div className="brand-pill-dot" />
            <span className="brand-pill-text">Flow Farm Dashboard</span>
          </div>

          <h1 className="hero-title">
            Your ecosystem<br />
            <span>starts here.</span>
          </h1>

          <p className="hero-sub">
            Set up your aquaponics monitoring system in minutes. Track water chemistry, fish health, and plant growth all from one intelligent dashboard.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6 2 2 7 2 12s4 10 10 10 10-4.5 10-10S18 2 12 2z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div>
                <div className="feature-text-title">Real-time monitoring</div>
                <div className="feature-text-sub">Live pH, temperature, and dissolved oxygen readings every 30 seconds</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10M12 20V4M6 20v-6"/>
                </svg>
              </div>
              <div>
                <div className="feature-text-title">Yield analytics</div>
                <div className="feature-text-sub">Track harvest cycles and optimize grow schedules with AI-powered insights</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <div>
                <div className="feature-text-title">Smart alerts</div>
                <div className="feature-text-sub">Instant notifications when your system needs attention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useEffect, useState } from 'react';

/**
 * Google Login Component (No heavy external React-OAuth packages)
 * 
 * Note: You will need to add this script to your index.html:
 * <script src="https://accounts.google.com/gsi/client" async defer></script>
 * 
 * And you should have your GOOGLE_CLIENT_ID ready.
 */

const GoogleAuthTest: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Configuration - replace with your actual values
    const CLIENT_ID = '997116455594-h6ifnjinmapocltti4vic81dskbtbv5h.apps.googleusercontent.com';

    const BACKEND_URL = 'http://localhost:3000/authentication/google';

    useEffect(() => {
        /* global google */
        const initializeGoogle = () => {
            if ((window as any).google) {
                (window as any).google.accounts.id.initialize({
                    client_id: CLIENT_ID,
                    callback: handleCallbackResponse,
                });

                (window as any).google.accounts.id.renderButton(
                    document.getElementById('googleSignInButton'),
                    { theme: 'outline', size: 'large', type: 'standard', shape: 'pill' }
                );
            }
        };

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogle;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleCallbackResponse = async (response: any) => {
        setLoading(true);
        setError(null);

        // The response.credential is the ID Token from Google
        const idToken = response.credential;

        try {
            const result = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idToken }),
            });

            if (!result.ok) {
                throw new Error(`Server responded with ${result.status}`);
            }

            const data = await result.json();
            console.log('Backend Response:', data);
            setUser(data);
            alert('Login Successful! Check console for tokens.');
        } catch (err: any) {
            console.error('Auth Error:', err);
            setError(err.message || 'Failed to authenticate with backend');
        } finally {
            setLoading(false);
        }
    };

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            maxWidth: '450px',
            margin: '40px auto',
        },
        title: {
            fontSize: '24px',
            marginBottom: '10px',
            fontWeight: '600',
            background: 'linear-gradient(90deg, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        subtitle: {
            fontSize: '14px',
            color: '#888',
            marginBottom: '30px',
            textAlign: 'center',
        },
        buttonContainer: {
            marginTop: '20px',
            transition: 'transform 0.2s ease',
        },
        status: {
            marginTop: '20px',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '13px',
            width: '100%',
            textAlign: 'center',
        },
        error: {
            backgroundColor: 'rgba(255, 87, 87, 0.1)',
            color: '#ff5757',
            border: '1px solid rgba(255, 87, 87, 0.2)',
        },
        success: {
            backgroundColor: 'rgba(87, 255, 126, 0.1)',
            color: '#57ff7e',
            border: '1px solid rgba(87, 255, 126, 0.2)',
        },
        userInfo: {
            marginTop: '30px',
            textAlign: 'left',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: '15px',
            borderRadius: '12px',
            fontSize: '12px',
            overflowX: 'auto',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>asdfasdf Back</h1>
            <p style={styles.subtitle}>Test your NestJS Google Auth Integration</p>

            <div id="googleSignInButton" style={styles.buttonContainer}></div>

            {loading && <p style={{ marginTop: '20px', color: '#888' }}>Authenticating...</p>}

            {error && (
                <div style={{ ...styles.status, ...styles.error }}>
                    {error}
                </div>
            )}

            {user && (
                <div style={{ ...styles.status, ...styles.success }}>
                    ✓ Successfully authenticated with backend
                    <pre style={styles.userInfo}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default GoogleAuthTest;

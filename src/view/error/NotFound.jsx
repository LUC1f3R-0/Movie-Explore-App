import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const [count, setCount] = React.useState(6);

    const logging = JSON.parse(localStorage.getItem('login'));

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev === 1) {
                    clearInterval(interval);
                    React.startTransition(() => {
                        if (logging) {
                            navigate('/movies');
                        } else {
                            navigate('/');
                        }
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate, logging]);

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}>
                <DotLottieReact
                    src="https://lottie.host/f4ec2d33-0b14-4430-b4a5-42837db53aeb/kRkMRwb0SN.lottie"
                    loop
                    autoplay
                />
            </div>
            <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
                Redirecting in {count}...
            </p>
        </>
    );
};

export default NotFound;

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const SOCKET_URL = 'http://localhost:8080/ws-notifications';

const RealTimeNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new SockJS(SOCKET_URL);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/notifications', (message) => {
                if (message.body) {
                    const now = new Date();
                    const day = now.toLocaleDateString(undefined, { weekday: 'long' });
                    const date = now.toLocaleDateString();
                    const time = now.toLocaleTimeString();
                    const fullMsg = `${message.body} [${day}, ${date} ${time}]`;
                    setNotifications(prev => {
                        if (prev[0] === fullMsg) return prev;
                        return [fullMsg, ...prev];
                    });
                }
            });
        });

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <h2>Real-Time Notifications</h2>
            <ul style={{ paddingLeft: 18 }}>
                {notifications.map((msg, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default RealTimeNotifications;
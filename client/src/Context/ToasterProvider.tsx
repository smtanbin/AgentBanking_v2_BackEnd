{/* <Notification closable type="info" header="Informational" style={{ position: "absolute", zIndex: 999 }}>
    <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
</Notification> */}
import React, { ReactNode, useState } from 'react';
import { Notification } from 'rsuite';

interface Toast {
    id: number;
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    description?: string;
    duration?: number;
}

interface ToasterContextProps {
    addToast: (toast: Toast) => void;
}
type ToasterProviderProps = {
    children: ReactNode;
};

export const ToasterContext = React.createContext<ToasterContextProps>({
    addToast: () => { },
});

const ToasterProvider = ({ children }: ToasterProviderProps): JSX.Element => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Toast) => {
        setToasts((prevToasts) => [...prevToasts, toast]);
    };

    const removeToast = (toast: Toast) => {
        setToasts((prevToasts) => prevToasts.filter((t) => t !== toast));
    };

    const removeAllToasts = () => {
        setToasts([]);
    };

    return (
        <ToasterContext.Provider value={{ addToast }}>
            {children}

            {toasts.map((toast) => (

                <Notification key={toast.id} type={toast.type} header={toast.title} closable>
                    {toast.description}
                </Notification>

            ))}

        </ToasterContext.Provider>
    );
};

export default ToasterProvider;

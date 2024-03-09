import React from 'react';

interface ErrorProps {
    error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
    return (
        <div>
            <h2>При запросе произошла ошибка: {error}</h2>
        </div>
    );
};

export default Error;
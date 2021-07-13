import React from 'react';

export const Home: React.FC = () => {
    return(
        <>
            <div style={{backgroundImage: "url('/assets/img/sportBackground.jpeg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                height: "90vh"}}>
                <h1>ESC</h1>
            </div>
        </>
    )

}
import React from 'react';

export type PostiLiberiProps = {
    postiLiberiAggiornati: number
}

export const PostiLiberi: React.FC<PostiLiberiProps> = ({postiLiberiAggiornati}) => {
    return (
        <div>
            <span>{postiLiberiAggiornati}</span>
        </div>
    )
}
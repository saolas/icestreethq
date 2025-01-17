import React, { useState } from 'react';
import ChatBox, { ChatFrame } from 'react-chat-plugin';

export default function ChatSystem() {
    const [attr, setAttr] = useState({
        showChatbox: false,
        showIcon: true,
        messages: [],
    });
    const [typing, setTyping] = useState(false)

    const handleClickIcon = () => {
        setAttr({
            ...attr,
            showChatbox: !attr.showChatbox,
            showIcon: !attr.showIcon,
        });
    };

    const handleOnSendMessage = (message) => {
        setAttr({
            ...attr,
            messages: attr.messages.concat({
                author: {
                    username: 'user1',
                    id: 1,
                    avatarUrl: '/user.jpeg',
                },
                text: message,
                type: 'text',
                timestamp: +new Date(),
            }),
        });
        setTyping(true)
    };
    return (
        <ChatFrame
            chatbox={
                <ChatBox
                    onSendMessage={handleOnSendMessage}
                    userId={1}
                    messages={attr.messages}
                    width={'300px'}
                    showTypingIndicator={typing}
                    activeAuthor={{ username: 'johnilizy', id: 2, avatarUrl: "/beautiful.webp" }}
                />
            }
            icon={<svg style={{ marginLeft: 10 }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-chat-text-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
            </svg>}
            clickIcon={handleClickIcon}
            showChatbox={attr.showChatbox}
            showIcon={attr.showIcon}
            iconStyle={{ background: 'black', fill: 'white' }}
        >
 </ChatFrame>
    );
}
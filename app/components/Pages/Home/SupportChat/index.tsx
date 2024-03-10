import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import styled from 'styled-components';
const Chat = styled.div`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 5px 20px rgba(0,0,0,.08);
  border-radius: ${props => props.theme.borderRadius[2]};
  position: relative;
  width: 420px;
`
const ChatHeader = styled.header`
    border-top-left-radius: ${props => props.theme.borderRadius[2]};
    border-top-right-radius: ${props => props.theme.borderRadius[2]};
    padding: ${props => props.theme.space[5]};
    background-color: ${props => props.theme.colors.lightBluePrimary};
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSizes.mediumLarge};
    font-weight: bold;
    line-height: 1;
`;
const ChatBody = styled.div`
    border-bottom-left-radius: ${props => props.theme.borderRadius[2]};
    border-bottom-right-radius: ${props => props.theme.borderRadius[2]};
    padding: ${props => props.theme.space[5]} ${props => props.theme.space[5]} ${props => props.theme.space[10]};
`;
const ChatOutputWrap = styled.div`
    height: 480px;
    overflow-y: auto;
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.blackPrimary};
`;
const ChatOutput = styled.div`
    max-height: 480px;
`;
const ChatInputWrap = styled.div`
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 40px);
    background-color: ${props => props.theme.colors.white};
    padding-top: ${props => props.theme.space[5]};
`;
const ChatInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;

  width: calc(100% - 52px);
  border-radius: ${props => props.theme.borderRadius[1]};
  word-break: break-word;
  padding: ${props => props.theme.space[2]};
  border: solid 1px ${props => props.theme.colors.lightGray};
`;
const SendButton = styled.button`
  border-radius: ${props => props.theme.borderRadius[1]};
  background: ${props => props.theme.colors.lightBluePrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
  width: 42px;
  &:hover {
    opacity: .7;
  }
`

const SupportChat = () => {
  const [data, setData] = useState<string>('スキルについて質問してください。');
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Custom-Header': 'ValidValue'
  });

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(inputText),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);

      setLoading(false);
      setData(responseData);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  return (
    <Chat>
      <ChatHeader>
        <p>AIスキルナビゲーター</p>
      </ChatHeader>
      <ChatBody>
        <ChatOutputWrap>
          <ChatOutput>{data}</ChatOutput>
        </ChatOutputWrap>
        <ChatInputWrap>
          <ChatInput
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <SendButton as="button" disabled={loading} onClick={() => fetchDataFromGeminiProAPI()}>
            {loading ? "..." : <FontAwesomeIcon icon={faPaperPlane} />}
          </SendButton>
        </ChatInputWrap>
      </ChatBody>
    </Chat>
  );
};

export default SupportChat;
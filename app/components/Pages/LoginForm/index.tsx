'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Loading from '../../Loading';
import styled from "styled-components";
const Form = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    p {
      position: absolute;
      bottom: -21px;
      font-weight: bold;
      color: ${props => props.theme.colors.red};
      font-size: ${props => props.theme.fontSizes.xSmall};
    }
    ${props => props.theme.breakpoint.sp`
      width: 100%;
      flex-direction: column;
    `}
`;
const Input = styled.input`
  background-color: ${props => props.theme.colors.offWhite};
  appearance: none;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
  width: 320px;
  border-radius: ${props => props.theme.borderRadius[1]};
  word-break: break-word;
  padding: ${props => props.theme.space[2]} ${props => props.theme.space[4]};
  &::placeholder {
    color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.fontSizes.small};
  }
  ${props => props.theme.breakpoint.sp`
    width: 100%;
    min-height: 52px;
  `}
`;
const Button = styled.button`
  margin-inline: auto;
  border-radius: ${props => props.theme.borderRadius[1]};
  background: ${props => props.theme.colors.blackSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
  width: 120px;
  padding: ${props => props.theme.space[2]};
  margin-left: ${props => props.theme.space[2]};
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    opacity: .7;
  }
  ${props => props.theme.breakpoint.sp`
    margin-top: ${(props: { theme: { space: any[]; }; }) => props.theme.space[4]};
    margin-left: ${(props: { theme: { space: any[]; }; }) => props.theme.space[0]};
    width: 100%;
    min-height: 52px;
  `}
`;
const NowLoadingContainer = styled.div`
  margin-top: -200px;
  width: 100%;
  display: flex;
  height: calc(100vh - 50px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.lightBluePrimary};
    margin-top: ${props => props.theme.space[1]};
    margin-left: ${props => props.theme.space[4]};
  }
`

interface FormInputs {
  password: string;
}

const LoginForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        router.push('/');
      } else {
        console.error('Authentication failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during the fetch:', error);
    } finally {
      // setIsLoading(false);
    }
  };
  return (
    <>
    {!isLoading ? (
      <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="password"
            {...register("password", { required: "パスワードは必須です" })}
            placeholder="パスワードを入力してください"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button type="submit">ログイン</Button>
      </Form>
    ) : (
      <NowLoadingContainer>
          <Loading/>
          <p>Now loading...</p>
      </NowLoadingContainer>
    )}
  </>
  );
};
export default LoginForm;
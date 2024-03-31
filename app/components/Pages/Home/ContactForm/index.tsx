import React from 'react';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';
const Form = styled.form`
position: relative;
`;
const FormInner = styled.div`
  margin-top: ${props => props.theme.space[10]};
  width: 680px;
  border-radius: ${props => props.theme.borderRadius[2]};
  margin-inline: auto;
  ${props => props.theme.breakpoint.sp`
    width: 100%;
    margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[0]};
  `}
`;
const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.space[7]};
  ${props => props.theme.breakpoint.sp`
    width: 100%;
    margin-top: ${(props: { theme: { space: any; }; }) => props.theme.space[4]};
  `}
  p {
    position: absolute;
    font-weight: bold;
    bottom: -21px;
    color: ${props => props.theme.colors.red};
    font-size: ${props => props.theme.fontSizes.xSmall};
  }
`;
const Label = styled.label`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.blackPrimary};
  text-align: left;
  margin-bottom: ${props => props.theme.space[1]};
`;
const Button = styled.button`
  margin-top: ${props => props.theme.space[10]};
  margin-inline: auto;
  border-radius: ${props => props.theme.borderRadius[1]};
  background: ${props => props.theme.colors.blackPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.mediumLarge};
  font-weight: bold;
  cursor: pointer;
  width: 240px;
  padding: ${props => props.theme.space[4]};
  &:hover {
    opacity: .7;
  }
`;
const Input = styled.input`
  background-color: ${props => props.theme.colors.white};
  appearance: none;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
  width: 100%;
  border-radius: ${props => props.theme.borderRadius[1]};
  word-break: break-word;
  padding: ${props => props.theme.space[2]} ${props => props.theme.space[2]};
`
const Textarea = styled.textarea`
  appearance: none;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
  width: 100%;
  border-radius: ${props => props.theme.borderRadius[1]};
  word-break: break-word;
  padding: ${props => props.theme.space[1]} ${props => props.theme.space[2]};
  height: 120px;
`

interface FormInputs {
  subject: string;
  name: string;
  email: string;
  message: string;
}

const ContactForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
    } catch (error) {
      console.error('エラーまたはカスタムエラー発生:', error);
    } finally {
      if (process.env.NODE_ENV === 'development') {
        console.log('終了処理');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInner>
        <Row>
          <Label htmlFor="subject">件名</Label>
          <Input id="subject" {...register("subject", { required: "※件名は必須です" })} />
          {errors.subject && <p role="alert">{errors.subject.message}</p>}
        </Row>
        <Row>
          <Label htmlFor="name">名前</Label>
          <Input id="name" {...register("name", { required: "※名前は必須です" })} />
          {errors.name && <p role="alert">{errors.name.message}</p>}
        </Row>
        <Row>
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" {...register("email", { required: "※メールアドレスは必須です", pattern: { value: /^\S+@\S+\.\S+$/, message: "※無効なメールアドレスです" } })} />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </Row>
        <Row>
          <Label htmlFor="message">お問い合わせ内容</Label>
          <Textarea id="message" {...register("message", { required: "※お問い合わせ内容は必須です" })} />
          {errors.message && <p role="alert">{errors.message.message}</p>}
        </Row>
        <Button type="submit">送信</Button>
      </FormInner>
    </Form>
  );
}
export default ContactForm;
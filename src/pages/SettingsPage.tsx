import { App, Button, Card, Form, Input, Space, Switch, Typography } from 'antd';
import React, { useMemo, useState } from 'react';

import { useModalBlocker } from '../hooks/useModalBlocker';

const { Title, Paragraph, Text } = Typography;

type SettingsFormValues = {
  name: string;
  email: string;
  notifications: boolean;
};

export const SettingsPage = () => {
  const { modal, message } = App.useApp();
  const [form] = Form.useForm<SettingsFormValues>();
  const [isDirty, setIsDirty] = useState(false);

  const confirmModalProps = useMemo(
    () => ({
      title: 'Отменить и выйти?',
      content: 'Вы уходите со страницы настроек, несохранённые изменения будут потеряны.',
      okText: 'Выйти',
      cancelText: 'Отмена',
    }),
    [],
  );

  useModalBlocker({
    isBlocked: isDirty,
    modal,
    modalProps: confirmModalProps,
  });

  const onFinish = () => {
    setIsDirty(false);
    message.success('Настройки сохранены');
  };

  return (
    <Space orientation="vertical" size={20} style={{ width: '100%', maxWidth: 640 }}>
      <div>
        <Title level={2} style={{ marginBottom: 8 }}>
          Настройки
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Измените любое поле и попробуйте перейти на другую страницу. Сработает useBlocker из React Router.
        </Paragraph>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ name: 'Иван Иванов', email: 'ivan@example.com', notifications: true }}
          onValuesChange={() => setIsDirty(true)}
          onFinish={onFinish}
        >
          <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input placeholder="Как к вам обращаться" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Введите email' },
              { type: 'email', message: 'Некорректный email' },
            ]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item name="notifications" label="Получать уведомления" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setIsDirty(false);
              }}
            >
              Сбросить
            </Button>
          </Space>
        </Form>
      </Card>

      <Text type={isDirty ? 'danger' : 'secondary'}>
        {isDirty
          ? 'Есть несохранённые изменения — переход будет заблокирован.'
          : 'Все изменения сохранены — навигация свободна.'}
      </Text>
    </Space>
  );
};

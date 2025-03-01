import Form from '../Form';
import Button from '../Form/Button';
import Radio from '../Form/Radio';
import React from 'react';
import { Label, Title } from '../Typography';
import { useTranslation } from 'react-i18next';
import PageTitle from '../PageTitle/v2';

export default function PureRoleSelection({
  onSubmit,
  title,
  inputs,
  inputClasses = {},
  redirectConsent,
  onGoBack,
}) {
  const { t } = useTranslation(['translation', 'common']);
  return (
    <Form
      onSubmit={onSubmit}
      buttonGroup={
        <>
          <Button onClick={onGoBack} color={'secondary'} fullLength>
            {t('common:BACK')}
          </Button>
          <Button type={'submit'} fullLength onClick={redirectConsent}>
            {t('common:CONTINUE')}
          </Button>
        </>
      }
    >
      <PageTitle onGoBack={onGoBack} title={title} style={{ marginBottom: '20px' }} />
      <Radio classes={inputClasses} {...inputs[0]} />
      <Radio classes={inputClasses} {...inputs[1]} />
      <Radio classes={inputClasses} {...inputs[2]} />
      <Title>
        {t('ROLE_SELECTION.IS_OWNER_OPERATED')} <Label sm>{t('common:OPTIONAL')}</Label>
      </Title>
      <Radio classes={inputClasses} {...inputs[3]} />
      <Radio classes={inputClasses} {...inputs[4]} />
    </Form>
  );
}

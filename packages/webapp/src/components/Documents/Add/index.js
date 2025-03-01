import React, { useEffect, useState } from 'react';
import Input from '../../Form/Input';
import Form from '../../Form';
import { useTranslation } from 'react-i18next';
import ReactSelect from '../../Form/ReactSelect';
import Checkbox from '../../Form/Checkbox';
import InputAutoSize from '../../Form/InputAutoSize';
import Button from '../../Form/Button';
import MultiStepPageTitle from '../../PageTitle/MultiStepPageTitle';
import PageTitle from '../../PageTitle/v2';
import { ReactComponent as TrashIcon } from '../../../assets/images/document/trash.svg';
import { Controller, useForm } from 'react-hook-form';
import CertifierSelectionMenuItem from '../../CertifierSelection/CertifierSelectionMenu/CertiferSelectionMenuItem';
import { Loading } from '../../Loading/Loading';

function PureDocumentDetailView({
  submit,
  onGoBack,
  onCancel,
  deleteImage,
  useHookFormPersist,
  imageComponent,
  persistedFormData,
  isEdit,
  persistedPath,
  documentUploader,
}) {
  const { t } = useTranslation();
  const typeOptions = {
    CLEANING_PRODUCT: { label: t('DOCUMENTS.TYPE.CLEANING_PRODUCT'), value: 'CLEANING_PRODUCT' },
    CROP_COMPLIANCE: { label: t('DOCUMENTS.TYPE.CROP_COMPLIANCE'), value: 'CROP_COMPLIANCE' },
    FERTILIZING_PRODUCT: {
      label: t('DOCUMENTS.TYPE.FERTILIZING_PRODUCT'),
      value: 'FERTILIZING_PRODUCT',
    },
    PEST_CONTROL_PRODUCT: {
      label: t('DOCUMENTS.TYPE.PEST_CONTROL_PRODUCT'),
      value: 'PEST_CONTROL_PRODUCT',
    },
    SOIL_AMENDMENT: { label: t('DOCUMENTS.TYPE.SOIL_AMENDMENT'), value: 'SOIL_AMENDMENT' },
    OTHER: { label: t('DOCUMENTS.TYPE.OTHER'), value: 'OTHER' },
  };

  const NAME = 'name';
  const TYPE = 'type';
  const VALID_UNTIL = 'valid_until';
  const NOTES = 'notes';
  const NO_EXPIRATION = 'no_expiration';

  const defaultData = persistedFormData
    ? {
        name: persistedFormData.name,
        type: typeOptions[persistedFormData.type],
        valid_until: persistedFormData.valid_until?.substring(0, 10),
        notes: persistedFormData.notes,
        files: persistedFormData.files,
        no_expiration: persistedFormData.no_expiration,
      }
    : {};

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onBlur',
    shouldUnregister: false,
    defaultValues: defaultData,
  });

  const submitWithFiles = (data) => {
    const getDocumentThumbnailUrl = (files) => {
      for (const file of files) {
        if (file.thumbnail_url) return file.thumbnail_url;
      }
      return undefined;
    };
    let validUntil = !!data.valid_until ? data.valid_until : null;
    data.type = !!data.type ? data.type.value : data.type;
    submit({
      ...data,
      thumbnail_url: getDocumentThumbnailUrl(uploadedFiles),
      files: uploadedFiles.map((file, i) => ({
        ...file,
      })),
      valid_until: validUntil,
    });
  };

  const noExpirationChecked = watch(NO_EXPIRATION);

  const {
    persistedData: { uploadedFiles },
  } = useHookFormPersist(persistedPath, getValues);
  const [isFirstFileUpdateEnded, setIsFilesUpdated] = useState(false);
  const onFileUpdateEnd = () => {
    setIsFilesUpdated(true);
  };

  const [shouldShowLoadingImage, setShouldShowLoadingImage] = useState(
    !isEdit && !uploadedFiles?.length,
  );
  const onUpload = () => {
    setShouldShowLoadingImage(true);
  };
  useEffect(() => {
    uploadedFiles?.length && setShouldShowLoadingImage(false);
  }, [uploadedFiles?.length]);

  const disabled = isEdit
    ? !isValid || uploadedFiles?.length === 0 || !(isDirty || isFirstFileUpdateEnded)
    : !isValid || uploadedFiles?.length === 0;

  return (
    <Form
      onSubmit={handleSubmit(submitWithFiles)}
      buttonGroup={
        <Button type={'submit'} disabled={disabled} fullLength>
          {isEdit ? t('common:UPDATE') : t('common:SAVE')}
        </Button>
      }
    >
      {isEdit && (
        <PageTitle
          onGoBack={onGoBack}
          title={t('DOCUMENTS.EDIT_DOCUMENT')}
          style={{ marginBottom: '24px' }}
        />
      )}
      {!isEdit && (
        <MultiStepPageTitle
          onGoBack={onGoBack}
          onCancel={onCancel}
          value={66}
          title={t('DOCUMENTS.ADD.TITLE')}
          style={{ marginBottom: '24px' }}
        />
      )}
      <Input
        name={NAME}
        hookFormRegister={register(NAME, { required: true })}
        label={t('DOCUMENTS.ADD.DOCUMENT_NAME')}
        classes={{ container: { paddingBottom: '40px' } }}
        errors={errors[NAME] && t('common:REQUIRED')}
      />
      <Controller
        control={control}
        name={TYPE}
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactSelect
            optional
            options={Object.values(typeOptions)}
            label={t('DOCUMENTS.ADD.TYPE')}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            style={{ paddingBottom: '40px' }}
          />
        )}
      />
      {!noExpirationChecked && (
        <Input
          type={'date'}
          name={VALID_UNTIL}
          hookFormRegister={register(VALID_UNTIL)}
          label={t('DOCUMENTS.ADD.VALID_UNTIL')}
          optional
          classes={{ container: { paddingBottom: '18px' } }}
        />
      )}
      <Checkbox
        hookFormRegister={register(NO_EXPIRATION)}
        label={t('DOCUMENTS.ADD.DOES_NOT_EXPIRE')}
        classes={{ container: { paddingBottom: '42px' } }}
      />
      <div
        style={{
          width: '312px',
          flexGrow: 1,
          margin: 'auto',
          paddingBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '24px',
        }}
      >
        {uploadedFiles?.map(({ thumbnail_url, file_name, url }, index) => (
          <div key={thumbnail_url}>
            <div
              style={{
                background: 'var(--teal700)',
                width: '24px',
                height: '24px',
                position: 'relative',
                float: 'right',
                borderRadius: '4px 0 4px 4px',
                zIndex: 10,
              }}
              onClick={() => {
                deleteImage(url);
                onFileUpdateEnd();
              }}
            >
              <TrashIcon />
            </div>
            {thumbnail_url ? (
              imageComponent({
                width: '100%',
                style: { position: 'relative', top: '-24px', zIndex: 0 },
                height: '100%',
                src: thumbnail_url,
              })
            ) : (
              <CertifierSelectionMenuItem
                certifierName={file_name}
                style={{ position: 'relative', top: '-24px', zIndex: 0 }}
              />
            )}
          </div>
        ))}
        {shouldShowLoadingImage && <Loading style={{ minHeight: '192px' }} />}
      </div>
      {uploadedFiles?.length <= 5 &&
        documentUploader({
          style: { paddingBottom: '32px' },
          linkText: t('DOCUMENTS.ADD.ADD_MORE_PAGES'),
          onUpload,
          onUploadEnd: onFileUpdateEnd,
        })}
      <InputAutoSize
        hookFormRegister={register(NOTES)}
        name={NOTES}
        label={t('common:NOTES')}
        optional
        classes={{ container: { paddingBottom: '40px' } }}
      />
    </Form>
  );
}

export default PureDocumentDetailView;

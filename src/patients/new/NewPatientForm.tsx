import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@hospitalrun/components'
import SelectWithLabelFormGroup from '../../components/input/SelectWithLableFormGroup'
import TextFieldWithLabelFormGroup from '../../components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../components/input/TextInputWithLabelFormGroup'
import DatePickerWithLabelFormGroup from '../../components/input/DatePickerWithLabelFormGroup'

const NewPatientForm = () => {
  const { t } = useTranslation()
  const [isEditable] = useState(true)
  const [patient, setPatient] = useState({
    givenName: '',
    familyName: '',
    suffix: '',
    prefix: '',
    dateOfBirth: '',
    placeOfBirth: '',
    sex: '',
    phoneNumber: '',
    email: '',
    address: '',
    preferredLanguage: '',
    occupation: '',
    type: '',
  })

  const onSaveButtonClick = async () => {
    console.log(patient)
  }

  const onFieldChange = (key: string, value: string) => {
    setPatient({
      ...patient,
      [key]: value,
    })
  }

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, fieldName: string) => {
    onFieldChange(fieldName, event.currentTarget.value)
  }

  const onInputElementChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    onFieldChange(fieldName, event.currentTarget.value)
  }

  return (
    <div>
      <form>
        <h3>{t('patient.basicInformation')}</h3>
        <div className="row">
          <div className="col-md-2">
            <TextInputWithLabelFormGroup
              label={t('patient.prefix')}
              name="prefix"
              value={patient.prefix}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'prefix')
              }}
            />
          </div>
          <div className="col-md-4">
            <TextInputWithLabelFormGroup
              label={t('patient.givenName')}
              name="givenName"
              value={patient.givenName}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'given')
              }}
            />
          </div>
          <div className="col-md-4">
            <TextInputWithLabelFormGroup
              label={t('patient.familyName')}
              name="familyName"
              value={patient.familyName}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'family')
              }}
            />
          </div>
          <div className="col-md-2">
            <TextInputWithLabelFormGroup
              label={t('patient.suffix')}
              name="suffix"
              value={patient.suffix}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'suffix')
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <SelectWithLabelFormGroup
              name="sex"
              label={t('patient.sex')}
              value={patient.sex}
              isEditable={isEditable}
              options={[
                { label: t('sex.male'), value: 'male' },
                { label: t('sex.female'), value: 'female' },
                { label: t('sex.other'), value: 'other' },
                { label: t('sex.unknown'), value: 'unknown' },
              ]}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                onSelectChange(event, 'sex')
              }}
            />
          </div>
          <div className="col">
            <DatePickerWithLabelFormGroup
              name="dateOfBirth"
              label={t('patient.dateOfBirth')}
              isEditable={isEditable}
              value={patient.dateOfBirth}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'dateOfBirth')
              }}
            />
          </div>
          <div className="col">
            <SelectWithLabelFormGroup
              name="type"
              label={t('patient.type')}
              value={patient.type}
              isEditable={isEditable}
              options={[
                { label: t('patient.types.charity'), value: 'charity' },
                { label: t('patient.types.private'), value: 'private' },
              ]}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                onSelectChange(event, 'type')
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <TextInputWithLabelFormGroup
              label={t('patient.occupation')}
              name="occupation"
              value={patient.occupation}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'occupation')
              }}
            />
          </div>
          <div className="col-md-4">
            <TextInputWithLabelFormGroup
              label={t('patient.preferredLanguage')}
              name="preferredLanguage"
              value={patient.preferredLanguage}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'preferredLanguage')
              }}
            />
          </div>
        </div>

        <h3>{t('patient.contactInformation')}</h3>
        <div className="row">
          <div className="col">
            <TextInputWithLabelFormGroup
              label={t('patient.phoneNumber')}
              name="phoneNumber"
              value={patient.phoneNumber}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'phoneNumber')
              }}
            />
          </div>
          <div className="col">
            <TextInputWithLabelFormGroup
              label={t('patient.email')}
              placeholder="email@email.com"
              name="email"
              value={patient.email}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onInputElementChange(event, 'email')
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextFieldWithLabelFormGroup
              label={t('patient.address')}
              name="address"
              value={patient.address}
              isEditable={isEditable}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                onFieldChange('address', event.currentTarget.value)
              }}
            />
          </div>
        </div>

        {isEditable && (
          <div className="row">
            <Button onClick={onSaveButtonClick}> {t('actions.save')}</Button>
            <Button color="danger" onClick={() => console.log('cancel button click')}>
              {t('actions.cancel')}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default NewPatientForm

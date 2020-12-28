import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import selectEvent from 'react-select-event'

import AddCarePlanModal from '../../../patients/care-plans/AddCarePlanModal'
import PatientRepository from '../../../shared/db/PatientRepository'
import CarePlan from '../../../shared/model/CarePlan'
import Patient from '../../../shared/model/Patient'

describe('Add Care Plan Modal', () => {
  const patient = {
    id: '0012',
    diagnoses: [
      { id: '123', name: 'too skinny', diagnosisDate: new Date().toISOString() },
      { id: '456', name: 'headaches', diagnosisDate: new Date().toISOString() },
    ],
    carePlans: [{}] as CarePlan[],
  } as Patient

  const onCloseSpy = jest.fn()
  const setup = () => {
    jest.resetAllMocks()
    jest.spyOn(PatientRepository, 'find').mockResolvedValue(patient)
    jest.spyOn(PatientRepository, 'saveOrUpdate')
    const history = createMemoryHistory()
    // eslint-disable-next-line react/prop-types
    const Wrapper: React.FC = ({ children }) => <Router history={history}>{children}</Router>

    const result = render(
      <AddCarePlanModal patient={patient} show onCloseButtonClick={onCloseSpy} />,
      { wrapper: Wrapper },
    )
    return result
  }

  it('should render a modal', () => {
    setup()
    const title = screen.getByText(/patient\.carePlan\.new/i, { selector: 'div' })
    expect(title).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /patient\.carePlan\.new/i })).toBeInTheDocument()
  })

  it('should render the care plan form', () => {
    setup()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should call the on close function when the cancel button is clicked', async () => {
    setup()
    userEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    )

    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  })

  it('should save care plan when the save button is clicked and close', async () => {
    const newCarePlan = {
      title: 'Feed Harry Potter',
      description: 'Get Dobby to feed Harry Potter',
      diagnosisId: '123', // condition
    }

    setup()

    const diagnosisId = screen.getAllByPlaceholderText('-- Choose --')[0] as HTMLInputElement
    const title = screen.getByPlaceholderText(/patient\.careplan\.title/i)
    const description = screen.getAllByRole('textbox')[1]

    await selectEvent.select(diagnosisId, 'too skinny')
    userEvent.type(title, newCarePlan.title)
    userEvent.type(description, newCarePlan.description)

    userEvent.click(await screen.getByRole('button', { name: /patient\.carePlan\.new/i }))

    await waitFor(() => {
      expect(PatientRepository.saveOrUpdate).toHaveBeenCalled()
    })
  })
})

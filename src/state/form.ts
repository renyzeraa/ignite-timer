import { create } from 'zustand'
import type { NewCycleFormData } from '../schemas/new-cycle-form-validator'
import type { UseFormReturn } from 'react-hook-form'

interface FormState {
    form: null | UseFormReturn<NewCycleFormData>
}

export const FormUseState = create<FormState>(() => ({
    form: null
}))
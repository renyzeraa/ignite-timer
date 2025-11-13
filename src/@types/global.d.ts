import type { NewCycleFormData } from "../schemas/new-cycle-form-validator"

interface Cycle extends NewCycleFormData {
    id: string
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

import z from "zod"

export const newCycleFormValidatorSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z.number().min(1, 'O ciclo precisa ser no mínimo 5 minutos.').max(60, 'O ciclo precisa ser no máximo 60 minutos.')
})

export type NewCycleFormData = z.infer<typeof newCycleFormValidatorSchema>
import { z } from "zod"

export const formSchema = z.object({
  license: z
    .string("Wprowadź wartość.")
    .min(11, "Liczba jest za krótka.")
    .max(11, "Numer jest za długi."),
  birthDate: z.date("Wskazać datę.")
})

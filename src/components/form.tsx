'use client'

import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { format } from "date-fns"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"

const formSchema = z.object({
  license: z
    .string("Wprowadź wartość.")
    .min(11, "Liczba jest za krótka.")
    .max(11, "Numer jest za długi."),
  birthDate: z.date("Wskazać datę."),
})

export default function LicenseForm() {
  const form = useForm({
    defaultValues: {
      license: undefined as string | undefined,
      birthDate: undefined as Date | undefined,
    },

    validators: {
      onSubmit: formSchema,
    },
    
    onSubmit: async ({ value }) => {
      console.log(value)
    }
  })

  return (
    <Card>
      <CardContent>
    <form
  onSubmit={(e) => {
    e.preventDefault()
    form.handleSubmit() 
  }}
>
      <form.Field
        name="license"
        children={(field) => {
           const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
          return (
          <Field className="">
            <FieldLabel>Numer licencji</FieldLabel>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Wprowadź numer licencji"
            />
             {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
            <FieldDescription>Wprowadź numer swojej licencji zgodnie z wymaganym formatem.</FieldDescription>
          </Field>
          )
        }}
      />

      <form.Field
        name="birthDate"
        children={(field) => {
           const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
          return (
          <Field className="py-3">
            <FieldLabel>Data urodzenia</FieldLabel>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-56 justify-between font-normal">
                  {field.state.value
                    ? format(field.state.value, "dd/MM/yyyy")
                    : "Wybierz datę"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.state.value}
                  captionLayout="dropdown"
                  onSelect={(date) => field.handleChange(date ?? undefined)}
                />
              </PopoverContent>
            </Popover>
             {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
            <FieldDescription>Podaj datę urodzenia.</FieldDescription>
          </Field>
          )
      }}
      />

      <Button type="submit">Szukaj</Button>
    </form>
    </CardContent>
    </Card>
  )
}

'use client'

import { useForm } from "@tanstack/react-form"
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
import { formSchema } from "./schema.client"
import { useMutation } from "@tanstack/react-query"
import { verifyUserRequest } from "@/lib/api/verify"

export default function LicenseForm() {
  const verifyMutation = useMutation({
    mutationFn: verifyUserRequest,
      onSuccess: (data) => {
    console.log('Server response:', data)
  },

  onError: (error) => {
    console.error('Verification error:', error)
  },
  })

  const form = useForm({
    defaultValues: {
      license: undefined as string | undefined,
      birthDate: undefined as Date | undefined,
    },

    validators: {
      onSubmit: formSchema,
    },
    
    onSubmit: async ({ value }) => {
  const parsed = formSchema.parse(value)
  verifyMutation.mutate(parsed)
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
      {verifyMutation.isPending && <p className="pt-5">Kontrola...</p>}

{verifyMutation.isError && (
  <p className="pt-5 text-red-500">
    Nie znaleziono licencji.
  </p>
)}

{verifyMutation.isSuccess && verifyMutation.data.success && (
  <p className="pt-5 text-green-500">
    Znaleziono licencję.
  </p>
)}

    </form>
    </CardContent>
    </Card>
  )
}

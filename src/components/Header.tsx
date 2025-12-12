
export function Header() {
  return (
    <header className="flex flex-row h-14 w-full items-center justify-between">
      <div className="flex flex-row h-full items-center">
      <a href='https://www.gov.pl/' className="flex flex-row h-full items-center gap-2.5 mx-5 border-r-2 border-red-500">
      <img src='/logo.png' className="h-full w-auto" alt="Logo"></img>
      <p className="max-w-80 font-medium text-sm">Ministerstwo Spraw Wewnętrznych Zastępca Sekretariatu Stanu odpowiedzialny za prowadzenie dokumentacji</p>
      </a>
      <p className="mx-5 font-light text-sm">
        Mój Gov
      </p>
      </div>
      <div className="h-full mx-5">
        <img src='eu-center-pl.svg' className="h-full w-auto" alt="Unia Europejska"></img>
      </div>
    </header>
  )
}

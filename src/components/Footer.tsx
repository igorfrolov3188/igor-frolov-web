export function Footer() {
    return (
        <div className="flex flex-col border-t-2 p-5 gap-5 border-red-500">
            <div className='flex flex-row gap-2.5 items-center'>
                <img src="logo.png" alt="Logo" className="w-auto h-11" />
                <p className='text-xs w-65'>Ministerstwo Spraw Wewnętrznych Zastępca Sekretariatu Stanu odpowiedzialny za prowadzenie dokumentacji</p>
            </div>
            <p className="text-xs text-muted-foreground">Wszystkie treści publikowane w serwisie są udostępniane na licencji Creative Commons: uznanie autorstwa - użycie niekomercyjne - bez utworów zależnych 3.0 Polska (CC BY-NC-ND 3.0 PL), o ile nie jest to stwierdzone inaczej.</p>
            <div className="flex flex-row w-full justify-around">
                <img src="fe-pc-left-pl.svg" alt="123" className="h-14 w-auto" />
                <img src="polish-flag.svg" alt="345" className="h-14 w-auto" />
                <img src="eu-flag.svg" alt="456" className="h-14 w-auto" />
            </div>
        </div>
    )
}
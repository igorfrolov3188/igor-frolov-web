import { createFileRoute } from '@tanstack/react-router'
import LicenseForm from '@/components/form'
import { Info } from "lucide-react"

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const today = new Date()
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <>
    <div className='flex h-[calc(100vh-78px)] w-screen justify-center items-center'>
    <LicenseForm />
    </div>
    <div className='flex flex-col border-t-2 border-gray-800/30 min-h-screen/2 mx-[12.5%] justify-center items-center py-5'>
      <div className='flex flex-row w-full align-center'>
        <Info className='w-5 h-5'/>
        <p className='text-xl font-bold'>UWAGA</p>
      </div>
      <p>Klikając przycisk «Sprawdź prawo jazdy» wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z 27.04.2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych).</p>
      <p className='text-muted-foreground text-sm'>Stanom na {formattedDate}. To jest data ostatniej aktualizacji usługi. Dane są aktualizowane codziennie o godzinie 6:00 rano i odzwierciedlają stan rekordów z poprzedniego dnia.</p>
    </div>
    </>
  )
}

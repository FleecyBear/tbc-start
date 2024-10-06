'use client'

import {useSearchParams} from 'next/navigation'

function CreateDetailProductPage(){
    const searchParams = useSearchParams()
    const data = JSON.parse(searchParams.get('data'));
    return(
        <div>
            {data.id}
        </div>
    )
}
export default CreateDetailProductPage;
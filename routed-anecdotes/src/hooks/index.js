import { useState } from 'react'

const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onClick = () => {
        setValue('')
    }

    return {
        name,
        value,
        onChange,
        onClick
    }
}

export default useField
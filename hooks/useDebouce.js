import {useState, useEffect} from 'react'

export default function useDebounce(value, ms) {
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), ms);
    // cleanup to prevent repeated calls
    return () => clearTimeout(timeout);
  }, [value, ms])

  return debounced
}
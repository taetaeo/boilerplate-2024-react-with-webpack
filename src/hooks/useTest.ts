import { useState } from 'react';

export default function useTest() {
  const [test, setTest] = useState<string>('test');
  return [test, setTest] as const;
}

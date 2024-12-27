import type { ChildrenProps } from '@chanoooo/libs';
import { useQuery } from '@chanoooo/libs/react';

function App({ children }: ChildrenProps) {
  const { data } = useQuery({
    queryKey: [''],
    queryFn: async () => {
      return await fetch('https://api.example.com').then((res) => {
        return res.json();
      });
    },
  });

  console.log(data);

  return <div>{children}</div>;
}

export default App;

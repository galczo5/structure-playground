export interface StructureElement {
  name: string;
  color?: string | 'random';
  children?: Array<StructureElement>;
}

export const DATA: StructureElement = {
  name: 'ROOT',
  children: [
    {
      name: 'Child Component 1',
      children: [
        {
          name: 'Child Component 3',
          children: [
            { name: 'Child Component 5' },
            { name: 'Child Component 6' }
          ]
        },
        { name: 'Child Component 4' }
      ]
    },
    {
      name: 'Child Component 2',
      children: [
        { name: 'Child Component 7' },
        { name: 'Child Component 8' }
      ]
    }
  ]
};

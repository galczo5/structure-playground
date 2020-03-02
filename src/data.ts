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
          name: 'Child Component 2',
          children: [
            { name: 'Child Component 3' },
            { name: 'Child Component 4' }
          ]
        },
        { name: 'Child Component 5' },
        { name: 'Child Component 6' }
      ]
    },
    {
      name: 'Child Component 7',
      children: [
        {
          name: 'Child Component 8',
          children: [
            { name: 'Child Component 9' }
          ]
        },
        {
          name: 'Child Component 10',
          children: [
            {
              name: 'Child Component 11',
              children: [
                { name: 'Child Component 12' },
                { name: 'Child Component 13' }
              ]
            },
            { name: 'Child Component 14' }
          ]
        }
      ]
    }
  ]
};

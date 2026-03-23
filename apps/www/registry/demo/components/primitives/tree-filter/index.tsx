import {
  TreeFilter,
  TreeFilterSearch,
  TreeFilterGroup,
  TreeFilterList,
} from '@/registry/components/primitives/tree-filter';

const treeData = [
  {
    id: 'rpg',
    label: 'RPG',
    count: 14,
    children: [
      { id: 'elden-ring', label: 'Elden Ring', count: 6 },
      { id: 'witcher3', label: 'The Witcher 3', count: 5 },
      { id: 'bg3', label: "Baldur's Gate 3", count: 3 },
    ],
  },
  {
    id: 'fps',
    label: 'FPS',
    count: 11,
    children: [
      { id: 'valorant', label: 'Valorant', count: 4 },
      { id: 'csgo', label: 'CS2', count: 4 },
      {
        id: 'halo',
        label: 'Halo',
        count: 3,
        children: [
          { id: 'halo-infinite', label: 'Halo Infinite', count: 2 },
          { id: 'halo-mcc', label: 'MCC', count: 1 },
        ],
      },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy',
    count: 8,
    children: [
      { id: 'civ6', label: 'Civilization VI', count: 3 },
      { id: 'aoe4', label: 'Age of Empires IV', count: 3 },
      { id: 'sc2', label: 'StarCraft II', count: 2 },
    ],
  },
  { id: 'indie', label: 'Indie', count: 5 },
];

export const TreeFilterDemo = () => {
  return (
    <TreeFilter defaultChecked={['elden-ring', 'valorant']}>
      <TreeFilterSearch placeholder="Search Games" />
      <TreeFilterGroup label="Games">
        <TreeFilterList items={treeData} />
      </TreeFilterGroup>
    </TreeFilter>
  );
};

export default TreeFilterDemo;

import Avatar from '@/registry/components/primitives/avatar';

export const AvatarDemo = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-4">
        <Avatar color="pink" size="md" shape="square" />
        <Avatar color="blue" size="md" shape="circle" />
        <Avatar color="green" size="md" shape="squircle" />
      </div>
    </div>
  );
};

export default AvatarDemo;

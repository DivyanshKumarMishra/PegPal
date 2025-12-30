import { useState } from 'react';

const tabs = [
  {
    label: 'Posts',
    value: 'posts',
  },
  {
    label: 'Friends',
    value: 'friends',
  },
  {
    label: 'Activity',
    value: 'activity',
  },
];

function UserTabView() {
  const [activeTab, setActiveTab] = useState<string | undefined>(tabs[0].value);
  return (
    <div className="flex-1 flex flex-col gap-10 w-full">
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center divide-x bg-black/50 backdrop-blur-xl rounded-md overflow-hidden">
          {tabs?.map(({ label, value }, idx) => {
            const isActive = value === activeTab;
            const isFirst = idx === 0;
            const isLast = idx === tabs.length - 1;

            return (
              <div
                key={value}
                onClick={() => setActiveTab(value)}
                className={`
                  px-5 py-3 md:px-10 text-xl cursor-pointer transition
                  ${
                    isActive
                      ? 'bg-accent/30 text-accent border-b-3 border-r-0 border-accent'
                      : 'hover:bg-white/5'
                  }
                  ${isActive && isFirst ? 'rounded-l-md' : ''}
                  ${isActive && isLast ? 'rounded-r-md' : ''}
                `}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex w-full'></div>
    </div>
  );
}

export default UserTabView;

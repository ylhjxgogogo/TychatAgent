import {  Avatar,  useControls, useCreateStore } from '@lobehub/ui';

// import { useCdnFn } from '@/ConfigProvider';

const Logo=()=>{
    const genCdnUrl = useCdnFn();
    const store = useCreateStore();
    const control = useControls(
      {
        animation: false,
        avatar: genCdnUrl({
          path: 'assets/logo-3d.webp',
          pkg: '@lobehub/assets-logo',
          version: 'latest',
        }),
        background: '#FEE064',
        shape: {
          options: ['circle', 'square'],
          value: 'circle',
        },
        size: {
          max: 128,
          min: 16,
          step: 1,
          value: 40,
        },
        title: 'cm',
      },
      { store },
    );
  
    return (
      
        <Avatar {...control} />
      
    );
}
export default Logo
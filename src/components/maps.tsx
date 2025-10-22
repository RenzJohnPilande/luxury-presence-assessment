'use client';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useMemo } from 'react';

export default function Maps() {
  const position = useMemo(() => ({ lat: 36.18438785301625, lng: -115.95498499953099 }), []);
  return (
    <div className='flex flex-wrap w-full'>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 36.18438785301625, lng: -115.95498499953099}}
        defaultZoom={15}
        gestureHandling='greedy'
        disableDefaultUI
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
    </div>
  )
}
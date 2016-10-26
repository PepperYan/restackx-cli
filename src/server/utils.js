import bowser      from 'bowser';

export function detectIsIOSDevice() {
  return bowser.ios;
}

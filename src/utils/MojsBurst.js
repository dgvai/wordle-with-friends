import mojs from '@mojs/core'

export const burst = new mojs.Burst({
  radius: {0:150},
  count: 15,
  opacity:  { 1: 0 },
  children: {
    shape: 'polygon',
    fill: { 'red' : 'yellow' },
    radius: 'rand(10,30)',
    rotate: { 360: 0 },
    duration: 2000
  }
});
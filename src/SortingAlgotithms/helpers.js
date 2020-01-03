export function addSwap(animations, pos) {
  const animation = {
    operation: 'swap',
    positions: pos
  };
  animations.push(animation);
}

export function addChange(animations, pos) {
  const animation = {
    operation: 'change-color',
    positions: pos
  };
  animations.push(animation);
}

export function addRevert(animations, pos) {
  const animation = {
    operation: 'revert-color',
    positions: pos
  };
  animations.push(animation);
}

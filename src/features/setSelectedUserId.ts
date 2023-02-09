import state from '../state/state';

const setSelectedUserId = (event: Event) => {
  const target = event.target;
  if (target instanceof HTMLSelectElement) {
    const id = target.options[target.selectedIndex].getAttribute('data-member-id');
    if (id) {
      state.selectedUserId = id;
    }
  }
};

export default setSelectedUserId;

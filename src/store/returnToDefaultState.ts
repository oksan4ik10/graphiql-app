import store from './store';

export default function returnToDefaultState() {
  store.dispatch({ type: 'RESET' });
}

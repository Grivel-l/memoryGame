import Colors from './Colors';
import Margins from './Margins';

export default {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors['backgroundColor']
  },
  gameWrapper: {
    flex: 1,
    padding: Margins['gameWrapper'],
    flexDirection: 'row'
  }
};

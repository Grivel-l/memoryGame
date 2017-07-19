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
  },
  button: {
    backgroundColor: Colors['tilesColor'],
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  }
};

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    fontFamily: 'OpenSans-Regular',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    color: '#333',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: "30%"
  },
  buttonText: {
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    fontSize: 16,
  },
});


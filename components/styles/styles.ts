import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  tab: {
    position: 'absolute',
    top: 32,
    width: 44,
    height: 44,
    justifyContent: 'center', // change here for symbol misalignment
    alignItems: 'center',
    backgroundColor: '#7b7b7bff',
    borderRadius: 22,
    zIndex: 1,
    opacity: 1,
    transform: [{ translateY: -22 }], 
 },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
 },
  row: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  col1: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
    overflow: 'hidden',
  },
  col2: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 8,
  },
  col3: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  expandButton: {
    fontWeight: 'bold',
    padding: 0,
  },
  leftContent: {
  padding: 12,
  },
  leftTabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 8,
  },
  leftTabText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendsHeader: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  friendItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  friendText: {
    fontSize: 15,
  },
});
import { StyleSheet, Platform } from 'react-native';
import { HEADER_HEIGHT } from './constants';

export const sharedStyles = StyleSheet.create({
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 32,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'web' ? 24 : 16,
  },
  tab: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 32,
    left: 0,
    width: Platform.OS === 'web' ? 52 : -40,
    height: Platform.OS === 'web' ? 52 : 25,
    justifyContent: 'center', // misalignment adjustment goes here
    alignItems: 'center',
    // backgroundColor: set dynamically in component!
    borderRadius: Platform.OS === 'web' ? 26 : 22,
    zIndex: 1,
    opacity: 1,
    transform: [{ translateY: Platform.OS === 'web' ? -26 : -60}],
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 20 : 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  col1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
    overflow: 'hidden',
  },
  col2: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: Platform.OS === 'web' ? 16 : 8,
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
    // Use marginRight on children for spacing instead of gap
  },
  stepContainer: {
    marginBottom: 8,
  },
  expandButton: {
    fontWeight: 'bold',
    padding: 0,
    fontSize: Platform.OS === 'web' ? 28 : 22,
  },
  leftContent: {
    padding: Platform.OS === 'web' ? 20 : 12,
  },
  leftTabButton: {
    paddingVertical: Platform.OS === 'web' ? 14 : 10,
    paddingHorizontal: Platform.OS === 'web' ? 22 : 16,
    borderRadius: 6,
    marginBottom: 8,
    // backgroundColor: set dynamically in component!
  },
  leftTabText: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 18 : 16,
  },
  friendsHeader: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 20 : 18,
    letterSpacing: 1,
  },
  friendItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  friendText: {
    fontSize: Platform.OS === 'web' ? 17 : 15,
  },
  parallaxContainer: {
    flex: 1,
  },
  parallaxHeader: {
    height: HEADER_HEIGHT, // You may need to export HEADER_HEIGHT from ParallaxScrollView or define it here
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingBottom: Platform.OS === 'web' ? 16 : 8,
  },
  parallaxContent: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});

export const friendsScreenStyles = StyleSheet.create({
  headerText: {
    fontSize: Platform.OS === 'web' ? 58 : 30,
    color: '#222', // override in component for dark mode
    textAlign: 'center',
    marginTop: 0,
  },
  rightColumn: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 320,
    backgroundColor: '#fff',
    zIndex: 20,
    padding: 24,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  rightColumnShared: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 320,
    backgroundColor: '#f9f9f9',
    zIndex: 30,
    padding: 24,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 12,
  },
  collapseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 30,
    padding: 4,
  },
  collapseButtonShared: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 40,
    padding: 4,
  },
  friendName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  sharedEventItem: {
    marginBottom: 12,
  },
  sharedEventTitle: {
    fontWeight: 'bold',
  },
});
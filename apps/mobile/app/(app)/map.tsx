import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';

// Phase 2: Full map screen with Google Maps, live location, search bar
export default function Map() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.logoMark} />
        <Text style={styles.text}>Map coming in Phase 2</Text>
        <Text style={styles.sub}>You're logged in ✓</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.mapBg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoMark: {
    width: 72, height: 72, borderRadius: 18,
    backgroundColor: colors.green, marginBottom: 20,
  },
  text: { fontSize: 20, fontWeight: '700', color: colors.charcoal },
  sub: { fontSize: 15, color: colors.muted, marginTop: 8 },
});

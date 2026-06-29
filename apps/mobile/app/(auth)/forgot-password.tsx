import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { colors, radius, spacing, shadows } from '../../constants/theme';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(getAuth(), email.trim());
      setSent(true);
    } catch {
      // Don't reveal whether email exists — always show success
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {sent ? (
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>📬</Text>
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successSub}>
              If an account exists for {email}, you'll receive a reset link shortly.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.btnText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.sub}>Enter your email and we'll send a reset link.</Text>

            <View style={styles.card}>
              <View style={styles.field}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.muted}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoFocus
                />
              </View>

              <TouchableOpacity
                style={[styles.btn, loading && { opacity: 0.7 }]}
                onPress={handleReset}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.btnText}>Send Reset Link</Text>
                }
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  container: { flex: 1, paddingHorizontal: spacing.xl },
  back: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  backText: { fontSize: 15, color: colors.green, fontWeight: '600' },
  title: { fontSize: 30, fontWeight: '800', color: colors.charcoal, marginBottom: 4 },
  sub: { fontSize: 15, color: colors.muted, marginBottom: spacing.xl },
  card: { backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.xl, ...shadows.md },
  field: { marginBottom: spacing.md },
  label: { fontSize: 13, fontWeight: '600', color: colors.charcoal, marginBottom: 6 },
  input: {
    height: 52, borderRadius: radius.sm, borderWidth: 1.5,
    borderColor: colors.border, paddingHorizontal: spacing.md,
    fontSize: 16, color: colors.charcoal, backgroundColor: colors.offWhite,
  },
  btn: {
    height: 56, borderRadius: radius.full, backgroundColor: colors.green,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm,
  },
  btnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  successCard: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: { fontSize: 64, marginBottom: spacing.lg },
  successTitle: { fontSize: 26, fontWeight: '800', color: colors.charcoal, marginBottom: spacing.sm },
  successSub: { fontSize: 15, color: colors.muted, textAlign: 'center', lineHeight: 24, marginBottom: spacing.xl },
});

import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, ScrollView, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { colors, radius, spacing, shadows } from '../../constants/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email.trim(), password);
      // Root layout handles redirect to map
    } catch (e: any) {
      const msg =
        e.code === 'auth/invalid-credential'
          ? 'Incorrect email or password.'
          : e.code === 'auth/too-many-requests'
          ? 'Too many attempts. Try again later.'
          : 'Login failed. Please try again.';
      Alert.alert('Login failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoMark} />
            <Text style={styles.wordmark}>NASI</Text>
            <Text style={styles.tagline}>Navigate Africa Smarter</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome back</Text>
            <Text style={styles.cardSub}>Sign in to continue</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.muted}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                  <Text style={styles.forgot}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.passWrap}>
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0 }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                  <Text style={styles.eye}>{showPass ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.btn, loading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>Sign In</Text>
              }
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.footerLink}>Create one</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  scroll: { flexGrow: 1, paddingHorizontal: spacing.xl, paddingBottom: spacing.xl },
  header: { alignItems: 'center', paddingTop: spacing.xxl, paddingBottom: spacing.xl },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.green,
    marginBottom: spacing.md,
  },
  wordmark: { fontSize: 32, fontWeight: '800', color: colors.charcoal, letterSpacing: 2 },
  tagline: { fontSize: 13, color: colors.muted, marginTop: 4 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.md,
  },
  cardTitle: { fontSize: 24, fontWeight: '700', color: colors.charcoal, marginBottom: 4 },
  cardSub: { fontSize: 15, color: colors.muted, marginBottom: spacing.xl },
  field: { marginBottom: spacing.md },
  label: { fontSize: 13, fontWeight: '600', color: colors.charcoal, marginBottom: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  forgot: { fontSize: 13, color: colors.green, fontWeight: '600' },
  input: {
    height: 52,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.charcoal,
    backgroundColor: colors.offWhite,
  },
  passWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.offWhite,
    paddingLeft: spacing.md,
  },
  eyeBtn: { padding: spacing.md },
  eye: { fontSize: 18 },
  btn: {
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  btnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingTop: spacing.xl },
  footerText: { fontSize: 15, color: colors.muted },
  footerLink: { fontSize: 15, color: colors.green, fontWeight: '600' },
});

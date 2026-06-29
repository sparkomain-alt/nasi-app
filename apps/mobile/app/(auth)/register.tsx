import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
  ScrollView, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { colors, radius, spacing, shadows } from '../../constants/theme';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Please enter your full name.';
    if (!email.trim() || !email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    return null;
  };

  const handleRegister = async () => {
    const err = validate();
    if (err) { Alert.alert('Invalid input', err); return; }

    setLoading(true);
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(user, { displayName: name.trim() });
      await setDoc(doc(getFirestore(), 'users', user.uid), {
        uid: user.uid,
        email: email.trim(),
        displayName: name.trim(),
        savedPlaces: [],
        preferences: { theme: 'light', voiceGuidance: true, avoidTolls: false, avoidHighways: false, language: 'en' },
        createdAt: serverTimestamp(),
        isNasirian: false,
      });
      // Root layout handles redirect to map
    } catch (e: any) {
      const msg =
        e.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : 'Registration failed. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.sub}>Join the NASI community</Text>

          <View style={styles.card}>
            {[
              { label: 'Full name', value: name, set: setName, placeholder: 'Chanda Mutale', caps: 'words' as const, type: 'default' as const },
              { label: 'Email', value: email, set: setEmail, placeholder: 'you@example.com', caps: 'none' as const, type: 'email-address' as const },
            ].map(({ label, value, set, placeholder, caps, type }) => (
              <View style={styles.field} key={label}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  placeholderTextColor={colors.muted}
                  autoCapitalize={caps}
                  keyboardType={type}
                  value={value}
                  onChangeText={set}
                />
              </View>
            ))}

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Min. 8 characters"
                placeholderTextColor={colors.muted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={[styles.input, confirm && confirm !== password && { borderColor: colors.error }]}
                placeholder="Repeat password"
                placeholderTextColor={colors.muted}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
              {confirm !== '' && confirm !== password && (
                <Text style={styles.errorMsg}>Passwords don't match</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.btn, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>Create Account</Text>
              }
            </TouchableOpacity>

            <Text style={styles.terms}>
              By creating an account you agree to our{' '}
              <Text style={{ color: colors.green }}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={{ color: colors.green }}>Privacy Policy</Text>.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.footerLink}>Sign in</Text>
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
  back: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  backText: { fontSize: 15, color: colors.green, fontWeight: '600' },
  title: { fontSize: 30, fontWeight: '800', color: colors.charcoal, marginBottom: 4 },
  sub: { fontSize: 15, color: colors.muted, marginBottom: spacing.xl },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.md,
  },
  field: { marginBottom: spacing.md },
  label: { fontSize: 13, fontWeight: '600', color: colors.charcoal, marginBottom: 6 },
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
  errorMsg: { fontSize: 12, color: colors.error, marginTop: 4 },
  btn: {
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  btnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  terms: { fontSize: 12, color: colors.muted, textAlign: 'center', marginTop: spacing.md, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingTop: spacing.xl },
  footerText: { fontSize: 15, color: colors.muted },
  footerLink: { fontSize: 15, color: colors.green, fontWeight: '600' },
});

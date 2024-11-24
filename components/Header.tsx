import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BackIcon } from './Icons';
import { globalStyles } from '../styles/globalStyles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = true }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Volver atrás"
        >
          <BackIcon width={24} height={24} fill="#FFFFFF" />
        </TouchableOpacity>
      )}
      <Text style={[globalStyles.title, styles.title]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2196F3',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    color: '#FFFFFF',
  },
});

